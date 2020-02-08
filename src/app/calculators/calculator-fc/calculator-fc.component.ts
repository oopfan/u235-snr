import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { UserTargetService } from 'src/app/services/user-target.service';
import { UserTelescopeService } from 'src/app/services/user-telescope.service';
import { UserCameraService } from 'src/app/services/user-camera.service';
import { UserObservatoryService } from 'src/app/services/user-observatory.service';
import { CalculationService } from 'src/app/services/calculation.service';

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
  
  targetObj = null;
  telescopeObj = null;
  cameraObj = null;
  observatoryObj = null;

  signalToNoiseRatio = '25';
  singleSubExposure = '120';
  totalIntegrationTime: number;
  frameCount: number;

  private targetEventsSubscription: Subscription;
  private telescopeEventsSubscription: Subscription;
  private cameraEventsSubscription: Subscription;
  private observatoryEventsSubscription: Subscription;

  calculateFC() {
    const result = this.calculationService.calculateFC(this.targetObj, this.telescopeObj, this.cameraObj, this.observatoryObj, this.signalToNoiseRatio, this.singleSubExposure);
    this.totalIntegrationTime = result.totalIntegrationTime;
    this.frameCount = Math.ceil(result.numberOfSubs);
  }

  getTarget() {
    this.targetObj = this.targetService.parseItems(this.targetService.getItem(this.targetId))[0];
  }

  getTelescope() {
    this.telescopeObj = this.telescopeService.parseItems(this.telescopeService.getItem(this.telescopeId))[0];
  }

  getCamera() {
    this.cameraObj = this.cameraService.parseItems(this.cameraService.getItem(this.cameraId))[0];
  }

  getObservatory() {
    this.observatoryObj = this.observatoryService.parseItems(this.observatoryService.getItem(this.observatoryId))[0];
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

    this.targetEventsSubscription = this.targetEvents.subscribe((targetId: string) => {
      this.targetId = targetId;
      this.getTarget();
      this.calculateFC();
    });
    this.telescopeEventsSubscription = this.telescopeEvents.subscribe((telescopeId: string) => {
      this.telescopeId = telescopeId;
      this.getTelescope();
      this.calculateFC();
    });
    this.cameraEventsSubscription = this.cameraEvents.subscribe((cameraId: string) => {
      this.cameraId = cameraId;
      this.getCamera();
      this.calculateFC();
    });
    this.observatoryEventsSubscription = this.observatoryEvents.subscribe((observatoryId: string) => {
      this.observatoryId = observatoryId;
      this.getObservatory();
      this.calculateFC();
    });
  }

  ngOnDestroy() {
    this.targetEventsSubscription.unsubscribe();
    this.telescopeEventsSubscription.unsubscribe();
    this.cameraEventsSubscription.unsubscribe();
    this.observatoryEventsSubscription.unsubscribe();
  }

  onChangeSignalToNoiseRatio(value: string) {
    this.signalToNoiseRatio = value;
    this.calculateFC();
  }

  onChangeSingleSubExposure(value: string) {
    this.singleSubExposure = value;
    this.calculateFC();
  }

}
