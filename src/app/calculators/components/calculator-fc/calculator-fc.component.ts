import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { TargetParsed, TelescopeParsed, CameraParsed, ObservatoryParsed } from '@core/services';
import { CalculationService } from '@core/services';
import { ChartDataSets } from 'chart.js';
import { Color } from 'ng2-charts';

@Component({
  selector: 'app-calculator-fc',
  templateUrl: './calculator-fc.component.html',
  styleUrls: ['./calculator-fc.component.css']
})
export class CalculatorFcComponent implements OnInit, OnDestroy {
  @Input() target: TargetParsed = null;
  @Input() telescope: TelescopeParsed = null;
  @Input() camera: CameraParsed = null;
  @Input() observatory: ObservatoryParsed = null;
  @Input() targetEvents: Observable<TargetParsed>;
  @Input() telescopeEvents: Observable<TelescopeParsed>;
  @Input() cameraEvents: Observable<CameraParsed>;
  @Input() observatoryEvents: Observable<ObservatoryParsed>;
  
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
    if (this.target !== null && this.telescope !== null && this.camera !== null && this.observatory !== null) {
      const result = this.calculationService.calculateFC(this.target, this.telescope, this.camera, this.observatory, this.signalToNoiseRatio, this.singleSubExposure);
      this.totalIntegrationTime = result.totalIntegrationTime;
      this.frameCount = Math.ceil(result.numberOfSubs);
    }
  }

  calculateChart() {
    if (this.target !== null && this.telescope !== null && this.camera !== null && this.observatory !== null) {
      let dataset = [];
      const terminal = parseFloat(this.singleSubExposure);
      for (let exposure = terminal; exposure >= 0.5; exposure = exposure / 2) {
        const result = this.calculationService.calculateFC(
          this.target,
          this.telescope,
          this.camera,
          this.observatory,
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

  constructor(private calculationService: CalculationService) { }

  ngOnInit() {
    this.calculateFC();
    this.calculateChart();

    if (this.targetEvents) {
      this.targetEventsSubscription = this.targetEvents.subscribe((target: TargetParsed) => {
        this.target = target;
        this.calculateFC();
        this.calculateChart();
      });
    }

    if (this.telescopeEvents) {
      this.telescopeEventsSubscription = this.telescopeEvents.subscribe((telescope: TelescopeParsed) => {
        this.telescope = telescope;
        this.calculateFC();
        this.calculateChart();
      });
    }

    if (this.cameraEvents) {
      this.cameraEventsSubscription = this.cameraEvents.subscribe((camera: CameraParsed) => {
        this.camera = camera;
        this.calculateFC();
        this.calculateChart();
      });
    }

    if (this.observatoryEvents) {
      this.observatoryEventsSubscription = this.observatoryEvents.subscribe((observatory: ObservatoryParsed) => {
        this.observatory = observatory;
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
