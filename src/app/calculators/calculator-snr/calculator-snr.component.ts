import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { UserTargetService } from 'src/app/services/user-target.service';
import { UserTelescopeService } from 'src/app/services/user-telescope.service';
import { UserCameraService } from 'src/app/services/user-camera.service';
import { UserObservatoryService } from 'src/app/services/user-observatory.service';
import { CalculationService } from 'src/app/services/calculation.service';

@Component({
  selector: 'app-calculator-snr',
  templateUrl: './calculator-snr.component.html',
  styleUrls: ['./calculator-snr.component.css']
})
export class CalculatorSnrComponent implements OnInit, OnDestroy {
  @Input() targetId = "";
  @Input() telescopeId = "";
  @Input() cameraId = "";
  @Input() observatoryId = "";
  @Input() targetEvents: Observable<string>;
  @Input() telescopeEvents: Observable<string>;
  @Input() cameraEvents: Observable<string>;
  @Input() observatoryEvents: Observable<string>;
  totalIntegrationTime = '5';
  singleSubExposure = '120';
  signalToNoiseRatio = '25';
  frameCount = "100";

  private targetEventsSubscription: Subscription;
  private telescopeEventsSubscription: Subscription;
  private cameraEventsSubscription: Subscription;
  private observatoryEventsSubscription: Subscription;

  targetName = 'n/a';
  telescopeName = 'n/a';
  cameraName = 'n/a';
  observatoryName = 'n/a';

  calculate() {
    const target = this.targetService.getItem(this.targetId);
    console.log('target', target[0].name);
  }

  constructor(
    private targetService: UserTargetService,
    private telescopeService: UserTelescopeService,
    private cameraService: UserCameraService,
    private observatoryService: UserObservatoryService,
    private calculationService: CalculationService) { }

  ngOnInit() {
    this.targetName = this.targetService.getItem(this.targetId)[0].name;
    this.telescopeName = this.telescopeService.getItem(this.telescopeId)[0].name;
    this.cameraName = this.cameraService.getItem(this.cameraId)[0].name;
    this.observatoryName = this.observatoryService.getItem(this.observatoryId)[0].name;

    this.targetEventsSubscription = this.targetEvents.subscribe((targetId: string) => {
      this.targetId = targetId;
      this.targetName = this.targetService.getItem(this.targetId)[0].name;
    });
    this.telescopeEventsSubscription = this.telescopeEvents.subscribe((telescopeId: string) => {
      this.telescopeId = telescopeId;
      this.telescopeName = this.telescopeService.getItem(this.telescopeId)[0].name;
    });
    this.cameraEventsSubscription = this.cameraEvents.subscribe((cameraId: string) => {
      this.cameraId = cameraId;
      this.cameraName = this.cameraService.getItem(this.cameraId)[0].name;
      });
    this.observatoryEventsSubscription = this.observatoryEvents.subscribe((observatoryId: string) => {
      this.observatoryId = observatoryId;
      this.observatoryName = this.observatoryService.getItem(this.observatoryId)[0].name;
    });
  }

  ngOnDestroy() {
    this.targetEventsSubscription.unsubscribe();
    this.telescopeEventsSubscription.unsubscribe();
    this.cameraEventsSubscription.unsubscribe();
    this.observatoryEventsSubscription.unsubscribe();
  }

  onChangeTotalIntegrationTime(value: string) {
    this.totalIntegrationTime = value;
    this.calculate();
  }

  onChangeSingleSubExposure(value: string) {
    this.singleSubExposure = value;
  }
}
