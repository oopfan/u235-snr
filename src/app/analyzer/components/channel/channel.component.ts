import { Component, Input, Output, OnInit, OnDestroy, EventEmitter } from '@angular/core';
import { Observable, Subscription, of, combineLatest, BehaviorSubject } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { TargetParsed, TelescopeParsed, CameraParsed, ObservatoryParsed } from '@core/services';
import { U235AstroSNR, U235AstroClock, U235AstroObservatory, U235AstroTarget, U235AstroService, U235AstroEquatorialCoordinates } from 'u235-astro';

declare const astro: any;

interface ColorBalance {
  R: BehaviorSubject<number>,
  G: BehaviorSubject<number>,
  B: BehaviorSubject<number>
}

interface Telescope {
  aperture: BehaviorSubject<number>,
  focalLength: BehaviorSubject<number>,
  centralObstruction: BehaviorSubject<number>,
  totalReflectanceTransmittance: BehaviorSubject<number>
}

interface Camera {
  pixelSize: BehaviorSubject<number>,
  readNoise: BehaviorSubject<number>,
  darkCurrent: BehaviorSubject<number>,
  quantumEfficiency: BehaviorSubject<number>
}

interface Target {
  surfaceBrightness: BehaviorSubject<number>,
  equ2000: BehaviorSubject<U235AstroEquatorialCoordinates>
}

interface Observatory {
  skyBrightness: BehaviorSubject<number>,
  latitude: BehaviorSubject<number>,
  longitude: BehaviorSubject<number>
}

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
  frameCount: number;
  integrationTime: number;
  SNR: number;
  altitudeFrom: string;
  altitudeTo: string;
  extinctionFrom: string;
  extinctionTo: string ;
  meanExtinction: string;

  prevAltMin$: Observable<number>;
  prevAltMax$: Observable<number>;
  prevExtMin$: Observable<number>;
  prevExtMax$: Observable<number>;
  prevExtSum$: Observable<number>;
  prevCumSNR$: Observable<number>;
  subAltMin: Subscription = null;
  subAltMax: Subscription = null;
  subExtMin: Subscription = null;
  subExtMax: Subscription = null;
  subExtSum: Subscription = null;
  subCumSNR: Subscription = null;

  exposureSubject: BehaviorSubject<number>;
  binningSubject: BehaviorSubject<number>;
  ucolorBalance: ColorBalance;
  utelescope: Telescope;
  ucamera: Camera;
  utarget: Target;
  uobservatory: Observatory;

  storageToMath = (value: number): number => {
    return this.utility.encodeAngleToMath(this.utility.decodeAngleFromStorage(value));
  }

  constructor(private utility: U235AstroService) {}
  
  ngOnInit() {
    this.clear();

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

    this.exposureSubject = new BehaviorSubject<number>(this.exposure);
    this.binningSubject = new BehaviorSubject<number>(this.binning);

    this.ucolorBalance = {
      R: new BehaviorSubject<number>(this.redBalance),
      G: new BehaviorSubject<number>(this.greenBalance),
      B: new BehaviorSubject<number>(this.blueBalance)
    }

    this.utelescope = {
      aperture: new BehaviorSubject<number>(this.telescope.aperture),
      focalLength: new BehaviorSubject<number>(this.telescope.focalLength),
      centralObstruction: new BehaviorSubject<number>(this.telescope.centralObstruction),
      totalReflectanceTransmittance: new BehaviorSubject<number>(this.telescope.totalReflectanceTransmittance)
    };

    this.ucamera = {
      pixelSize: new BehaviorSubject<number>(this.camera.pixelSize),
      readNoise: new BehaviorSubject<number>(this.camera.readNoise),
      darkCurrent: new BehaviorSubject<number>(this.camera.darkCurrent),
      quantumEfficiency: new BehaviorSubject<number>(this.camera.quantumEfficiency)
    };

    this.utarget = {
      surfaceBrightness: new BehaviorSubject<number>(this.target.surfaceBrightness),
      equ2000: new BehaviorSubject<U235AstroEquatorialCoordinates>({
        rightAscension: this.storageToMath(this.target.rightAscension),
        declination: this.storageToMath(this.target.declination)
      })
    };

    this.uobservatory = {
      skyBrightness: new BehaviorSubject<number>(this.observatory.skyBrightness),
      latitude: new BehaviorSubject<number>(this.storageToMath(this.observatory.latitude)),
      longitude: new BehaviorSubject<number>(this.storageToMath(this.observatory.longitude))
    }

    this.colorBalanceSubscription = this.colorBalanceEvents.subscribe(value => {
      this.ucolorBalance[value.filter].next(value.colorBalance);
    });

    this.telescopeSubscription = this.telescopeEvents.subscribe(value => {
      this.utelescope.aperture.next(value.aperture);
      this.utelescope.focalLength.next(value.focalLength);
      this.utelescope.centralObstruction.next(value.centralObstruction);
      this.utelescope.totalReflectanceTransmittance.next(value.totalReflectanceTransmittance);
    });

    this.cameraSubscription = this.cameraEvents.subscribe(value => {
      this.ucamera.pixelSize.next(value.pixelSize);
      this.ucamera.readNoise.next(value.readNoise);
      this.ucamera.darkCurrent.next(value.darkCurrent);
      this.ucamera.quantumEfficiency.next(value.quantumEfficiency);
    });

    this.targetSubscription = this.targetEvents.subscribe(value => {
      this.utarget.surfaceBrightness.next(value.surfaceBrightness);
      this.utarget.equ2000.next({
        rightAscension: this.storageToMath(value.rightAscension),
        declination: this.storageToMath(value.declination)
      });
    });

    this.observatorySubscription = this.observatoryEvents.subscribe(value => {
      this.uobservatory.skyBrightness.next(value.skyBrightness);
      this.uobservatory.latitude.next(this.storageToMath(value.latitude));
      this.uobservatory.longitude.next(this.storageToMath(value.longitude));
    });
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
    if (this.subAltMin !== null) {
      this.subAltMin.unsubscribe();
    }
    if (this.subAltMax !== null) {
      this.subAltMax.unsubscribe();
    }
    if (this.subExtMin !== null) {
      this.subExtMin.unsubscribe();
    }
    if (this.subExtMax !== null) {
      this.subExtMax.unsubscribe();
    }
    if (this.subExtSum !== null) {
      this.subExtSum.unsubscribe();
    }
    if (this.subCumSNR !== null) {
      this.subCumSNR.unsubscribe();
    }
  }

  onChangeColorBalance(value: string) {
    this.colorBalance = parseFloat(value);
    this.notifyColorBalance.emit({ filter: this.filter, colorBalance: this.colorBalance });
  }

  onChangeBinning(value: string) {
    this.binning = parseInt(value);
    this.binningSubject.next(this.binning);
  }

  onChangeExposure(value: string) {
    this.exposure = parseFloat(value);
    this.exposureSubject.next(this.exposure);
    this.integrationTime = this.frameCount * this.exposure / 3600;
  }

  onClear() {
    this.clear();
  }

  clear() {
    if (this.subAltMin !== null) {
      this.subAltMin.unsubscribe();
      this.subAltMin = null;
    }
    if (this.subAltMax !== null) {
      this.subAltMax.unsubscribe();
      this.subAltMax = null;
    }
    if (this.subExtMin !== null) {
      this.subExtMin.unsubscribe();
      this.subExtMin = null;
    }
    if (this.subExtMax !== null) {
      this.subExtMax.unsubscribe();
      this.subExtMax = null;
    }
    if (this.subExtSum !== null) {
      this.subExtSum.unsubscribe();
      this.subExtSum = null;
    }
    if (this.subCumSNR !== null) {
      this.subCumSNR.unsubscribe();
      this.subCumSNR = null;
    }

    this.prevAltMin$ = of(90);
    this.prevAltMax$ = of(-90);
    this.prevExtMin$ = of(100);
    this.prevExtMax$ = of(1);
    this.prevExtSum$ = of(0);
    this.prevCumSNR$ = of(0);

    this.frameCount = 0;
    this.integrationTime = 0;
    this.SNR = 0;
    this.altitudeFrom = 'n/a';
    this.altitudeTo = 'n/a';
    this.extinctionFrom = 'n/a';
    this.extinctionTo = 'n/a';
    this.meanExtinction = 'n/a';
  }

  readFiles(fileList: any) {
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

      const clock = new U235AstroClock();
      clock.date$ = of(new Date(dateObs));
      clock.init();

      const observatory = new U235AstroObservatory();
      observatory.latitude$ = self.uobservatory.latitude;
      observatory.longitude$ = self.uobservatory.longitude;
      observatory.connect(clock);
      observatory.init();

      const target = new U235AstroTarget();
      target.equ2000$ = self.utarget.equ2000;
      target.connect(observatory);
      target.init();

      self.frameCount++;
      self.integrationTime = self.frameCount * self.exposure / 3600;

      const currAltitude$ = target.horNow$.pipe(map(value => value.altitude));
      const currAirmass$ = currAltitude$.pipe(map(value => self.utility.calculateAirmass(value)));
      const extinction = {
        R: currAirmass$.pipe(map(self.utility.calculateRedExtinction)),
        G: currAirmass$.pipe(map(self.utility.calculateGreenExtinction)),
        B: currAirmass$.pipe(map(self.utility.calculateBlueExtinction)),
        L: of(0)
      };
      extinction.L = combineLatest(extinction.R, extinction.G, extinction.B).pipe(map(([r, g, b]) => (r + g + b) / 3));
      const currExtinction$: Observable<number> = extinction[self.filter];

      const fluxAttenuation = {
        R: combineLatest(self.ucolorBalance.R, extinction.R).pipe(map(self.utility.colorFluxAttenuation)),
        G: combineLatest(self.ucolorBalance.G, extinction.G).pipe(map(self.utility.colorFluxAttenuation)),
        B: combineLatest(self.ucolorBalance.B, extinction.B).pipe(map(self.utility.colorFluxAttenuation)),
        L: of(0)
      };
      fluxAttenuation.L = combineLatest(fluxAttenuation.R, fluxAttenuation.G, fluxAttenuation.B).pipe(map(self.utility.luminanceFluxAttenuation));
      const currFluxAttenuation$: Observable<number> = fluxAttenuation[self.filter];

      const snrModel = new U235AstroSNR();
      snrModel.fluxAttenuation$ = currFluxAttenuation$;
      snrModel.aperture$ = self.utelescope.aperture;
      snrModel.focalLength$ = self.utelescope.focalLength;
      snrModel.centralObstruction$ = self.utelescope.centralObstruction;
      snrModel.totalReflectanceTransmittance$ = self.utelescope.totalReflectanceTransmittance;
      snrModel.pixelSize$ = self.ucamera.pixelSize;
      snrModel.readNoise$ = self.ucamera.readNoise;
      snrModel.darkCurrent$ = self.ucamera.darkCurrent;
      snrModel.quantumEfficiency$ = self.ucamera.quantumEfficiency;
      snrModel.binning$ = self.binningSubject;
      snrModel.surfaceBrightness$ = self.utarget.surfaceBrightness;
      snrModel.skyBrightness$ = self.uobservatory.skyBrightness;
      snrModel.exposure$ = self.exposureSubject;
      snrModel.init();

      if (self.subAltMin !== null) {
        self.subAltMin.unsubscribe();
      }
      self.prevAltMin$ = combineLatest(currAltitude$, self.prevAltMin$).pipe(map(([curr, prev]) => Math.min(curr, prev)), shareReplay(1));
      self.subAltMin = self.prevAltMin$.subscribe(value => self.altitudeFrom = value.toFixed(1));

      if (self.subAltMax !== null) {
        self.subAltMax.unsubscribe();
      }
      self.prevAltMax$ = combineLatest(currAltitude$, self.prevAltMax$).pipe(map(([curr, prev]) => Math.max(curr, prev)), shareReplay(1));
      self.subAltMax = self.prevAltMax$.subscribe(value => self.altitudeTo = value.toFixed(1));

      if (self.subExtMin !== null) {
        self.subExtMin.unsubscribe();
      }
      self.prevExtMin$ = combineLatest(currExtinction$, self.prevExtMin$).pipe(map(([curr, prev]) => Math.min(curr, prev)), shareReplay(1));
      self.subExtMin = self.prevExtMin$.subscribe(value => self.extinctionFrom = value.toFixed(3));

      if (self.subExtMax !== null) {
        self.subExtMax.unsubscribe();
      }
      self.prevExtMax$ = combineLatest(currExtinction$, self.prevExtMax$).pipe(map(([curr, prev]) => Math.max(curr, prev)), shareReplay(1));
      self.subExtMax = self.prevExtMax$.subscribe(value => self.extinctionTo = value.toFixed(3));

      if (self.subExtSum !== null) {
        self.subExtSum.unsubscribe();
      }
      self.prevExtSum$ = combineLatest(currExtinction$, self.prevExtSum$).pipe(map(([curr, prev]) => curr + prev), shareReplay(1));
      self.subExtSum = self.prevExtSum$.subscribe(value => self.meanExtinction = (value / self.frameCount).toFixed(3));

      if (self.subCumSNR !== null) {
        self.subCumSNR.unsubscribe();
      }
      self.prevCumSNR$ = combineLatest(snrModel.signalToNoisePerSub$, self.prevCumSNR$).pipe(map(([curr, prev]) => curr * curr + prev), shareReplay(1));
      self.subCumSNR = self.prevCumSNR$.subscribe(value => self.SNR = Math.sqrt(value));

    });
  }

}
