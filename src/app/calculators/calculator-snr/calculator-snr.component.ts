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
  
  targetObj = null;
  telescopeObj = null;
  cameraObj = null;
  observatoryObj = null;

  totalIntegrationTime = '5';
  singleSubExposure = '120';
  signalToNoiseRatio = 'n/a';
  frameCount = "n/a";
  
  private targetEventsSubscription: Subscription;
  private telescopeEventsSubscription: Subscription;
  private cameraEventsSubscription: Subscription;
  private observatoryEventsSubscription: Subscription;

  calculateSNR() {
    const result = this.calculationService.calculateSNR(this.targetObj, this.telescopeObj, this.cameraObj, this.observatoryObj, this.totalIntegrationTime, this.singleSubExposure);
    this.signalToNoiseRatio = result.totalSignalToNoiseOfStack.toString();
    this.frameCount = result.numberOfSubs.toString();
  }

  constructor(
    private targetService: UserTargetService,
    private telescopeService: UserTelescopeService,
    private cameraService: UserCameraService,
    private observatoryService: UserObservatoryService,
    private calculationService: CalculationService) { }

  ngOnInit() {
    this.targetObj = this.targetService.getItem(this.targetId)[0];
    this.telescopeObj = this.telescopeService.getItem(this.telescopeId)[0];
    this.cameraObj = this.cameraService.getItem(this.cameraId)[0];
    this.observatoryObj = this.observatoryService.getItem(this.observatoryId)[0];
    this.calculateSNR();

    this.targetEventsSubscription = this.targetEvents.subscribe((targetId: string) => {
      this.targetId = targetId;
      this.targetObj = this.targetService.getItem(this.targetId)[0];
      this.calculateSNR();
    });
    this.telescopeEventsSubscription = this.telescopeEvents.subscribe((telescopeId: string) => {
      this.telescopeId = telescopeId;
      this.telescopeObj = this.telescopeService.getItem(this.telescopeId)[0];
      this.calculateSNR();
    });
    this.cameraEventsSubscription = this.cameraEvents.subscribe((cameraId: string) => {
      this.cameraId = cameraId;
      this.cameraObj = this.cameraService.getItem(this.cameraId)[0];
      this.calculateSNR();
    });
    this.observatoryEventsSubscription = this.observatoryEvents.subscribe((observatoryId: string) => {
      this.observatoryId = observatoryId;
      this.observatoryObj = this.observatoryService.getItem(this.observatoryId)[0];
      this.calculateSNR();
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
    this.calculateSNR();
  }

  onChangeSingleSubExposure(value: string) {
    this.singleSubExposure = value;
    this.calculateSNR();
  }
}
