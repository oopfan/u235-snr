import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { TargetParsed, TelescopeParsed, CameraParsed, ObservatoryParsed } from '@core/services';
import { CalculationService } from '@core/services';
import { ChartDataSets } from 'chart.js';
import { Color } from 'ng2-charts';

@Component({
  selector: 'app-calculator-snr',
  templateUrl: './calculator-snr.component.html',
  styleUrls: ['./calculator-snr.component.css']
})
export class CalculatorSnrComponent implements OnInit, OnDestroy {
  @Input() target: TargetParsed = null;
  @Input() telescope: TelescopeParsed = null;
  @Input() camera: CameraParsed = null;
  @Input() observatory: ObservatoryParsed = null;
  @Input() targetEvents: Observable<TargetParsed>;
  @Input() telescopeEvents: Observable<TelescopeParsed>;
  @Input() cameraEvents: Observable<CameraParsed>;
  @Input() observatoryEvents: Observable<ObservatoryParsed>;
  
  totalIntegrationTime = '5';
  singleSubExposure = '120';
  signalToNoiseRatio: number;
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
      label: 'Total signal-to-noise of stack vs Single sub exposure',
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

  calculateSNR() {
    if (this.target !== null && this.telescope !== null && this.camera !== null && this.observatory !== null) {
      const result = this.calculationService.calculateSNR(this.target, this.telescope, this.camera, this.observatory, this.totalIntegrationTime, this.singleSubExposure);
      this.signalToNoiseRatio = result.totalSignalToNoiseOfStack;
      this.frameCount = Math.ceil(result.numberOfSubs);
    }
  }

  calculateChart() {
    if (this.target !== null && this.telescope !== null && this.camera !== null && this.observatory !== null) {
      let dataset = [];
      const terminal = parseFloat(this.singleSubExposure);
      for (let exposure = terminal; exposure >= 0.5; exposure = exposure / 2) {
        const result = this.calculationService.calculateSNR(
          this.target,
          this.telescope,
          this.camera,
          this.observatory,
          this.totalIntegrationTime,
          exposure);
        dataset.unshift({ x: exposure, y: result.totalSignalToNoiseOfStack });
      }
      this.lineChartData[0].data = dataset;
    }
  }

  constructor(private calculationService: CalculationService) { }

  ngOnInit() {
    this.calculateSNR();
    this.calculateChart();

    if (this.targetEvents) {
      this.targetEventsSubscription = this.targetEvents.subscribe((target: TargetParsed) => {
        this.target = target;
        this.calculateSNR();
        this.calculateChart();
      });
    }

    if (this.telescopeEvents) {
      this.telescopeEventsSubscription = this.telescopeEvents.subscribe((telescope: TelescopeParsed) => {
        this.telescope = telescope;
        this.calculateSNR();
        this.calculateChart();
      });
    }

    if (this.cameraEvents) {
      this.cameraEventsSubscription = this.cameraEvents.subscribe((camera: CameraParsed) => {
        this.camera = camera;
        this.calculateSNR();
        this.calculateChart();
      });
    }

    if (this.observatoryEvents) {
      this.observatoryEventsSubscription = this.observatoryEvents.subscribe((observatory: ObservatoryParsed) => {
        this.observatory = observatory;
        this.calculateSNR();
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

  onChangeTotalIntegrationTime(value: string) {
    this.totalIntegrationTime = value;
    this.calculateSNR();
    this.calculateChart();
  }

  onChangeSingleSubExposure(value: string) {
    this.singleSubExposure = value;
    this.calculateSNR();
    this.calculateChart();
  }
}
