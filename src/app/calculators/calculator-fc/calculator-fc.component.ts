import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { UserTargetService, TargetParsed } from 'src/app/services/user-target.service';
import { UserTelescopeService, TelescopeParsed } from 'src/app/services/user-telescope.service';
import { UserCameraService, CameraParsed } from 'src/app/services/user-camera.service';
import { UserObservatoryService, ObservatoryParsed } from 'src/app/services/user-observatory.service';
import { CalculationService } from 'src/app/services/calculation.service';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';

@Component({
  selector: 'app-calculator-fc',
  templateUrl: './calculator-fc.component.html',
  styleUrls: ['./calculator-fc.component.css']
})
export class CalculatorFcComponent implements OnInit, OnDestroy {
  @Input() targetId = "";
  @Input() telescopeId = "";
  @Input() cameraId = "";
  @Input() observatoryId = "";
  @Input() targetEvents: Observable<string>;
  @Input() telescopeEvents: Observable<string>;
  @Input() cameraEvents: Observable<string>;
  @Input() observatoryEvents: Observable<string>;
  
  targetObj: TargetParsed = null;
  telescopeObj: TelescopeParsed = null;
  cameraObj: CameraParsed = null;
  observatoryObj: ObservatoryParsed = null;

  signalToNoiseRatio = '25';
  singleSubExposure = '120';
  totalIntegrationTime: number;
  frameCount: number;

  private targetEventsSubscription: Subscription;
  private telescopeEventsSubscription: Subscription;
  private cameraEventsSubscription: Subscription;
  private observatoryEventsSubscription: Subscription;

  dataset1 = [
    { x: 1, y: 2.9 },
    { x: 2, y: 4 },
    { x: 5, y: 6 },
    { x: 10, y: 8 },
    { x: 20, y: 10.1 },
    { x: 50, y: 12.7 },
    { x: 100, y: 14.1 },
    { x: 200, y: 15 },
    { x: 500, y: 15.6 }
  ];

  lineChartData: ChartDataSets[] = [
    {
      data: this.dataset1,
      label: 'Total integration time vs Single sub exposure',
      showLine: true,
      fill: false
    }
  ];

  lineChartOptions = {
    responsive: true
  };

  lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,255,0,0.28)',
    },
  ];

  lineChartLegend = true;
  lineChartPlugins = [];
  lineChartType = 'scatter';

  calculateFC() {
    if (this.targetObj && this.telescopeObj && this.cameraObj && this.observatoryObj) {
      const result = this.calculationService.calculateFC(this.targetObj, this.telescopeObj, this.cameraObj, this.observatoryObj, this.signalToNoiseRatio, this.singleSubExposure);
      this.totalIntegrationTime = result.totalIntegrationTime;
      this.frameCount = Math.ceil(result.numberOfSubs);
    }
  }

  calculateChart() {
    if (this.targetObj && this.telescopeObj && this.cameraObj && this.observatoryObj) {
      let dataset = [];
      const terminal = parseFloat(this.singleSubExposure);
      for (let exposure = terminal; exposure >= 0.5; exposure = exposure / 2) {
        const result = this.calculationService.calculateFC(
          this.targetObj,
          this.telescopeObj,
          this.cameraObj,
          this.observatoryObj,
          this.signalToNoiseRatio,
          exposure);
        if (isNaN(result.totalIntegrationTime) || (result.totalIntegrationTime > 100 && dataset.length > 1)) {
          break;
        }
        dataset.unshift({ x: exposure, y: result.totalIntegrationTime });
      }
      this.lineChartData[0].data = dataset;
    }
  }

  getTarget() {
    const id = parseInt(this.targetId);
    if (!isNaN(id)) {
      this.targetObj = this.targetService.parseItems(this.targetService.getItem(id))[0];
    }
    else {
      this.targetObj = null;
    }
  }

  getTelescope() {
    const id = parseInt(this.telescopeId);
    if (!isNaN(id)) {
      this.telescopeObj = this.telescopeService.parseItems(this.telescopeService.getItem(id))[0];
    }
    else {
      this.telescopeObj = null;
    }
  }

  getCamera() {
    const id = parseInt(this.cameraId);
    if (!isNaN(id)) {
      this.cameraObj = this.cameraService.parseItems(this.cameraService.getItem(id))[0];
    }
    else {
      this.cameraObj = null;
    }
  }

  getObservatory() {
    const id = parseInt(this.observatoryId);
    if (!isNaN(id)) {
      this.observatoryObj = this.observatoryService.parseItems(this.observatoryService.getItem(id))[0];
    }
    else {
      this.observatoryObj = null;
    }
  }

  constructor(
    private targetService: UserTargetService,
    private telescopeService: UserTelescopeService,
    private cameraService: UserCameraService,
    private observatoryService: UserObservatoryService,
    private calculationService: CalculationService) { }

  ngOnInit() {
    this.getTarget();
    this.getTelescope();
    this.getCamera();
    this.getObservatory();
    this.calculateFC();
    this.calculateChart();

    if (this.targetEvents) {
      this.targetEventsSubscription = this.targetEvents.subscribe((targetId: string) => {
        this.targetId = targetId;
        this.getTarget();
        this.calculateFC();
        this.calculateChart();
      });
    }

    if (this.telescopeEvents) {
      this.telescopeEventsSubscription = this.telescopeEvents.subscribe((telescopeId: string) => {
        this.telescopeId = telescopeId;
        this.getTelescope();
        this.calculateFC();
        this.calculateChart();
      });
    }

    if (this.cameraEvents) {
      this.cameraEventsSubscription = this.cameraEvents.subscribe((cameraId: string) => {
        this.cameraId = cameraId;
        this.getCamera();
        this.calculateFC();
        this.calculateChart();
      });
    }

    if (this.observatoryEvents) {
      this.observatoryEventsSubscription = this.observatoryEvents.subscribe((observatoryId: string) => {
        this.observatoryId = observatoryId;
        this.getObservatory();
        this.calculateFC();
        this.calculateChart();
      });
    }

  }

  ngOnDestroy() {
    if (this.targetEventsSubscription) {
      this.targetEventsSubscription.unsubscribe();
    }
    if (this.telescopeEventsSubscription) {
      this.telescopeEventsSubscription.unsubscribe();
    }
    if (this.cameraEventsSubscription) {
      this.cameraEventsSubscription.unsubscribe();
    }
    if (this.observatoryEventsSubscription) {
      this.observatoryEventsSubscription.unsubscribe();
    }
  }

  onChangeSignalToNoiseRatio(value: string) {
    this.signalToNoiseRatio = value;
    this.calculateFC();
    this.calculateChart();
  }

  onChangeSingleSubExposure(value: string) {
    this.singleSubExposure = value;
    this.calculateFC();
    this.calculateChart();
  }

}
