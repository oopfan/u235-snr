import { Component, Input, Output, OnInit, OnDestroy, EventEmitter } from '@angular/core';
import { AtmosphericExtinctionService, CalculationService, TargetParsed, TelescopeParsed, CameraParsed, ObservatoryParsed, UtilityService } from '@core/services';
import { Observable, Subscription } from 'rxjs';

declare const astro: any;

interface FileInfo {
  dateObs: string
}

interface Extinction {
  R: number,
  G: number,
  B: number,
  L: number
};

@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.css']
})
export class ChannelComponent implements OnInit, OnDestroy {
  @Input() name: string;
  @Input() exposure: number;
  @Input() redBalance: number;
  @Input() greenBalance: number;
  @Input() blueBalance: number;
  @Input() filter: string;
  @Input() binning: number;
  @Input() target: TargetParsed;
  @Input() targetEvents: Observable<TargetParsed>;
  @Input() telescope: TelescopeParsed;
  @Input() telescopeEvents: Observable<TelescopeParsed>;
  @Input() camera: CameraParsed;
  @Input() cameraEvents: Observable<CameraParsed>;
  @Input() observatory: ObservatoryParsed;
  @Input() observatoryEvents: Observable<ObservatoryParsed>;
  @Input() colorBalanceEvents: Observable<any>;
  @Output() notifyColorBalance:EventEmitter<any> = new EventEmitter();
  private targetSubscription: Subscription;
  private telescopeSubscription: Subscription;
  private cameraSubscription: Subscription;
  private observatorySubscription: Subscription;
  private colorBalanceSubscription: Subscription;
  colorBalance: number = 1;
  files: FileInfo[] = [];
  altitudes: number[] = [];
  extinctions: Extinction[] = [];
  subSNR: number[] = [];
  frameCount: number = 0;
  integrationTime: number = 0;
  SNR: number = 0;
  altitudeFrom: string = 'n/a';
  altitudeTo: string = 'n/a';
  extinctionFrom: string = 'n/a';
  extinctionTo: string = 'n/a';
  meanExtinction: string = 'n/a';

  constructor(
    private atmosphericExtinctionService: AtmosphericExtinctionService,
    private calculationService: CalculationService,
    private utility: UtilityService) { }

  ngOnInit() {
    switch(this.filter) {
      case 'R':
        this.colorBalance = this.redBalance;
        break;
      case 'G':
        this.colorBalance = this.greenBalance;
        break;
      case 'B':
        this.colorBalance = this.blueBalance;
        break;
    }
    if (this.colorBalanceEvents) {
      this.colorBalanceSubscription = this.colorBalanceEvents.subscribe((value: any) => {
        switch(value.filter) {
          case 'R':
            this.redBalance = value.colorBalance;
            break;
          case 'G':
            this.greenBalance = value.colorBalance;
            break;
          case 'B':
            this.blueBalance = value.colorBalance;
            break;
        }
        this.recalcSubSNR();
        this.recalcMeasures();
      });
    }
    if (this.targetEvents) {
      this.targetSubscription = this.targetEvents.subscribe((value: TargetParsed) => {
        this.target = value;
        this.recalcAltitudes();
        this.recalcExtinctions();
        this.recalcSubSNR();
        this.recalcMeasures();
      });
    }
    if (this.telescopeEvents) {
      this.telescopeSubscription = this.telescopeEvents.subscribe((value: TelescopeParsed) => {
        this.telescope = value;
        this.recalcSubSNR();
        this.recalcMeasures();
      });
    }
    if (this.cameraEvents) {
      this.cameraSubscription = this.cameraEvents.subscribe((value: CameraParsed) => {
        this.camera = value;
        this.recalcSubSNR();
        this.recalcMeasures();
      });
    }
    if (this.observatoryEvents) {
      this.observatorySubscription = this.observatoryEvents.subscribe((value: ObservatoryParsed) => {
        this.observatory = value;
        this.recalcAltitudes();
        this.recalcExtinctions();
        this.recalcSubSNR();
        this.recalcMeasures();
      });
    }
  }

  ngOnDestroy() {
    if (this.colorBalanceSubscription) {
      this.colorBalanceSubscription.unsubscribe();
    }
    if (this.targetSubscription) {
      this.targetSubscription.unsubscribe();
    }
    if (this.telescopeSubscription) {
      this.telescopeSubscription.unsubscribe();
    }
    if (this.cameraSubscription) {
      this.cameraSubscription.unsubscribe();
    }
    if (this.observatorySubscription) {
      this.observatorySubscription.unsubscribe();
    }
  }

  onChangeColorBalance(value: string) {
    this.colorBalance = parseFloat(value);
    this.notifyColorBalance.emit({ filter: this.filter, colorBalance: this.colorBalance });
  }

  onChangeBinning(value: string) {
    this.binning = parseInt(value);
    this.recalcSubSNR();
    this.recalcMeasures();
  }

  onChangeExposure(value: string) {
    this.exposure = parseFloat(value);
    this.recalcSubSNR();
    this.recalcMeasures();
  }

  onClear() {
    this.files = [];
    this.altitudes = [];
    this.extinctions = [];
    this.subSNR = [];
    this.recalcMeasures();
  }

  readFiles(fileList: any) {
    this.frameCount += fileList.length;
    for(let i = 0; i < fileList.length; i++) {
      this.readAsFITS(fileList[i]);
    }
  }

  private readAsFITS(theFile: any) {
    // This is the 'fitsjs' library available from npm:
    // 1) npm install fitsjs
    // 2) Edit /angular.json and add "./node_modules/fitsjs/lib/fits.js" to 'scripts' in 'assets' (two places)
    // 3) Wherever you want to use it add 'declare const astro: any;' to the top of a .ts file

    const self = this;

    new astro.FITS(theFile, function() {
      var header = this.getHeader();

      let dateObs: string = header.get('DATE-OBS');
      if (!dateObs.endsWith('Z')) {
        dateObs += 'Z';
      }
      self.files.push({ dateObs });

      const altitude = self.calculateAltitude(new Date(dateObs));
      self.altitudes.push(altitude);

      const extinction = self.calculateExtinction(altitude);
      self.extinctions.push(extinction);
  
      const subSNR = self.calculateSubSNR(extinction);
      self.subSNR.push(subSNR);

      self.recalcMeasures();
    });
  }

  calculateAltitude(date: Date): number {
    const altitude = this.utility.calculateAltitude(date, this.target, this.observatory);
    return altitude;
  }

  calculateExtinction(altitude: number): Extinction {
    const red = this.atmosphericExtinctionService.redExtinction(altitude);
    const green = this.atmosphericExtinctionService.greenExtinction(altitude);
    const blue = this.atmosphericExtinctionService.blueExtinction(altitude);
    const extinction: Extinction = {
      R: red,
      G: green,
      B: blue,
      L: (red + green + blue) / 3
    };
    return extinction;
  }

  calculateSubSNR(extinction: Extinction): number {
    const subSNR = this.calculationService.calculateSnrPerSub(
      this.filter,
      this.redBalance,
      this.greenBalance,
      this.blueBalance,
      extinction.R,
      extinction.G,
      extinction.B,
      this.binning,
      this.exposure,
      this.target,
      this.telescope,
      this.camera,
      this.observatory
    );
    return subSNR;
  }

  recalcAltitudes() {
    this.altitudes = this.files.map(file => this.calculateAltitude(new Date(file.dateObs)));
  }

  recalcExtinctions() {
    this.extinctions = this.altitudes.map(altitude => this.calculateExtinction(altitude));
  }

  recalcSubSNR() {
    this.subSNR = this.extinctions.map(extinction => this.calculateSubSNR(extinction));
  }

  recalcMeasures() {
    this.frameCount = this.altitudes.length;
    this.integrationTime = (this.frameCount * this.exposure) / 3600;
    this.SNR = Math.sqrt(this.subSNR.reduce((previousValue, currentValue) => (previousValue + currentValue * currentValue), 0));

    if (this.frameCount > 0) {
      this.altitudeFrom = this.altitudes.reduce((previousValue, currentValue) => {
        return currentValue < previousValue ? currentValue : previousValue;
      }, 90).toFixed(1);
  
      this.altitudeTo = this.altitudes.reduce((previousValue, currentValue) => {
        return currentValue > previousValue ? currentValue : previousValue;
      }, 0).toFixed(1);
  
      // Be careful that there could be NaN's in there!
      this.extinctionFrom = this.extinctions.map(extinction => extinction[this.filter]).reduce((previousValue, currentValue) => {
        return currentValue < previousValue ? currentValue : previousValue;
      }, 10).toFixed(3);
  
      // Be careful that there could be NaN's in there!
      this.extinctionTo = this.extinctions.map(extinction => extinction[this.filter]).reduce((previousValue, currentValue) => {
        return currentValue > previousValue ? currentValue : previousValue;
      }, 1).toFixed(3);
  
      this.meanExtinction = (this.extinctions.map(extinction => extinction[this.filter]).reduce((previousValue, currentValue) => {
        return currentValue + previousValue;
      }, 0) / this.extinctions.length).toFixed(3);
    }
    else {
      this.altitudeFrom = 'n/a';
      this.altitudeTo = 'n/a';
      this.extinctionFrom = 'n/a';
      this.extinctionTo = 'n/a';
      this.meanExtinction = 'n/a';
    }
  }

}
