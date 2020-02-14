import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { UserTargetService } from 'src/app/services/user-target.service';
import { UserTelescopeService } from 'src/app/services/user-telescope.service';
import { UserCameraService } from 'src/app/services/user-camera.service';
import { UserObservatoryService } from 'src/app/services/user-observatory.service';
import { CalculationService } from 'src/app/services/calculation.service';

interface TargetParsed {
  id: number,
  name: string,
  surfaceBrightness: number
}

interface TelescopeParsed {
  id: number,
  name: string,
  aperture: number,
  focalLength: number,
  centralObstruction: number,
  totalReflectanceTransmittance: number
}

interface CameraParsed {
  id: number,
  name: string,
  pixelSize: number,
  readNoise: number,
  darkCurrent: number,
  quantumEfficiency: number
}

interface ObservatoryParsed {
  id: number,
  name: string,
  bortleClass: string,
  skyBrightness: number
}

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
  
  targetObj: TargetParsed = null;
  telescopeObj: TelescopeParsed = null;
  cameraObj: CameraParsed = null;
  observatoryObj: ObservatoryParsed = null;

  totalIntegrationTime = '5';
  singleSubExposure = '120';
  signalToNoiseRatio: number;
  frameCount: number;
  
  private targetEventsSubscription: Subscription;
  private telescopeEventsSubscription: Subscription;
  private cameraEventsSubscription: Subscription;
  private observatoryEventsSubscription: Subscription;

  calculateSNR() {
    if (this.targetObj && this.telescopeObj && this.cameraObj && this.observatoryObj) {
      const result = this.calculationService.calculateSNR(this.targetObj, this.telescopeObj, this.cameraObj, this.observatoryObj, this.totalIntegrationTime, this.singleSubExposure);
      this.signalToNoiseRatio = result.totalSignalToNoiseOfStack;
      this.frameCount = Math.ceil(result.numberOfSubs);
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
    this.calculateSNR();

    if (this.targetEvents) {
      this.targetEventsSubscription = this.targetEvents.subscribe((targetId: string) => {
        this.targetId = targetId;
        this.getTarget();
        this.calculateSNR();
      });
    }

    if (this.telescopeEvents) {
      this.telescopeEventsSubscription = this.telescopeEvents.subscribe((telescopeId: string) => {
        this.telescopeId = telescopeId;
        this.getTelescope();
        this.calculateSNR();
      });
    }

    if (this.cameraEvents) {
      this.cameraEventsSubscription = this.cameraEvents.subscribe((cameraId: string) => {
        this.cameraId = cameraId;
        this.getCamera();
        this.calculateSNR();
      });
    }

    if (this.observatoryEvents) {
      this.observatoryEventsSubscription = this.observatoryEvents.subscribe((observatoryId: string) => {
        this.observatoryId = observatoryId;
        this.getObservatory();
        this.calculateSNR();
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
  }

  onChangeSingleSubExposure(value: string) {
    this.singleSubExposure = value;
    this.calculateSNR();
  }
}
