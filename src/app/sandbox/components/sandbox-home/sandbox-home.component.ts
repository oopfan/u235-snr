import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Timekeeper, Vector3D, Matrix3D } from '@shared/classes';
import { UtilityService, UserObservatoryService, ObservatoryParsed, UserTargetService, TargetParsed } from '@core/services';
import mapSort from 'mapsort';

@Component({
  selector: 'app-sandbox-home',
  templateUrl: './sandbox-home.component.html',
  styleUrls: ['./sandbox-home.component.css']
})
export class SandboxHomeComponent implements OnInit, OnDestroy {
  browserTitle = 'SANDBOX | U235+SNR';
  intervalId = 0;
  date = new Date();
  timekeeper = new Timekeeper();
  utcString = '';
  jdString = '';
  gmstString = '';
  lmstString = '';
  rightAscensionChanged = 0;
  raNow = [ 1, 0, 0, 0, 0];
  declinationChanged = 0;
  decNow = [ 1, 0, 0, 0, 0];
  azimuthChanged = 0;
  azimuth = [ 1, 0, 0, 0, 0];
  altitudeChanged = 0;
  altitude = [ 1, 0, 0, 0, 0];
  hourAngleChanged = 0;
  hourAngle = [ 1, 0, 0, 0, 0 ];
  selectedObservatory = "-";
  observatories = [];
  observatoryObj: ObservatoryParsed = null;
  selectedTarget = "-";
  targets = [];
  targetObj: TargetParsed = null;

  compareString = (a: any, b: any) => a.localeCompare(b);

  constructor(
    private titleService: Title,
    private utility: UtilityService,
    private observatoryService: UserObservatoryService,
    private targetService: UserTargetService) {}

  ngOnInit() {
    this.titleService.setTitle(this.browserTitle);
    this.observatories = mapSort(this.observatoryService.parseItems(this.observatoryService.getAll()).filter(this.observatoryService.validate), element => element.name, this.compareString);
    this.targets = mapSort(this.targetService.parseItems(this.targetService.getAll()).filter(this.targetService.validate), element => element.name, this.compareString);
    this.update();
    this.startTimer();
  }

  ngOnDestroy() {
    this.clearTimer();
  }

  onRightAscensionChanged() {
    this.rightAscensionChanged++;
  }

  onDeclinationChanged() {
    this.declinationChanged++;
  }

  onAltitudeChanged() {
    this.altitudeChanged++;
  }

  onAzimuthChanged() {
    this.azimuthChanged++;
  }

  onHourAngleChanged() {
    this.hourAngleChanged++;
  }

  onChangeObservatory(value: string) {
    this.selectedObservatory = value;
    this.getObservatory();
    this.update();
  }

  onChangeTarget(value: string) {
    this.selectedTarget = value;
    this.getTarget();
    this.update();
  }

  getObservatory() {
    const id = parseInt(this.selectedObservatory);
    if (!isNaN(id)) {
      this.observatoryObj = this.observatoryService.parseItems(this.observatoryService.getItem(id))[0];
    }
    else {
      this.observatoryObj = null;
    }
  }

  getTarget() {
    const id = parseInt(this.selectedTarget);
    if (!isNaN(id)) {
      this.targetObj = this.targetService.parseItems(this.targetService.getItem(id))[0];
    }
    else {
      this.targetObj = null;
    }
  }

  startTimer() {
    this.intervalId = window.setInterval(() => {
      this.update();
    }, 1000);
  }

  update() {
    this.date.setTime(Date.now());
    this.timekeeper.setDate(this.date);
    const jd = this.timekeeper.getJD();
    this.utcString = this.date.toUTCString();
    // this.jdString = jd.toFixed(4);
    // this.gmstString = this.utility.formatHMS(this.utility.toRadians(this.timekeeper.getGMST() * 15));
    const obliquity = this.utility.calculateObliquityOfEcliptic(jd);
    const precession = this.utility.calculatePrecessionSinceJ2000(jd);
    const matEquToEcl = new Matrix3D();
    matEquToEcl.setRotateX(obliquity);
    const matEclToEqu = new Matrix3D();
    matEclToEqu.setRotateX(-obliquity);
    const matPrecessToDate = new Matrix3D();
    matPrecessToDate.setRotateZ(-precession);

    if (this.targetObj) {
      const raDecoded = this.utility.decodeAngleFromStorage(this.targetObj.rightAscension);
      const raHours = this.utility.encodeAngleToMath(raDecoded);
      const raRadians = this.utility.toRadians(raHours * 15);
      const decDecoded = this.utility.decodeAngleFromStorage(this.targetObj.declination);
      const decDegrees = this.utility.encodeAngleToMath(decDecoded);
      const decRadians = this.utility.toRadians(decDegrees);

      const vec = new Vector3D();
      vec.setPolar(raRadians, decRadians, 1);
      vec.matrixMultiply(matEquToEcl);
      vec.matrixMultiply(matPrecessToDate);
      vec.matrixMultiply(matEclToEqu);
      var answer = vec.getPolar();
      let raNow = answer[0];
      if (raNow < 0) {
        raNow += 2 * Math.PI;
      }
      // this.raNow = this.utility.decodeAngleFromMath(this.utility.toDegrees(raNow) / 15);
      const decNow = answer[1];
      // this.decNow = this.utility.decodeAngleFromMath(this.utility.toDegrees(decNow));

      if (this.observatoryObj) {
        const longitudeDecoded = this.utility.decodeAngleFromStorage(this.observatoryObj.longitude);
        const longitudeDegrees = this.utility.encodeAngleToMath(longitudeDecoded);
        const latitudeDecoded = this.utility.decodeAngleFromStorage(this.observatoryObj.latitude);
        const latitudeDegrees = this.utility.encodeAngleToMath(latitudeDecoded);
  
        let lmst = this.timekeeper.getGMST() * 15 + longitudeDegrees;
        if (lmst < 0) {
            lmst += 360;
        }
        if (lmst >= 360) {
            lmst -= 360;
        }
        const lmstRadians = this.utility.toRadians(lmst);
        // this.lmstString = this.utility.formatHMS(lmstRadians);
  
        const rotY = new Matrix3D();
        rotY.setRotateY(this.utility.toRadians(90 - latitudeDegrees));
        const rotZ = new Matrix3D();
        rotZ.setRotateZ(lmstRadians);
        const matEquToHor = new Matrix3D();
        matEquToHor.matrixMultiply(rotY).matrixMultiply(rotZ);
    
        const vec = new Vector3D();
        vec.setPolar(raNow, decNow, 1);
        vec.matrixMultiply(matEquToHor);
        var polar = vec.getPolar();
        // this.azimuth = this.utility.decodeAngleFromMath(this.utility.toDegrees(Math.PI - polar[0]));
        this.altitude = this.utility.decodeAngleFromMath(this.utility.toDegrees(polar[1]) + 1 / 120);

        let ha = this.utility.toDegrees(lmstRadians - raNow) / 15;
        ha += 1 / 120;  // round to half minute
        if (ha > 12) {
          ha -= 24;
        }
        if (ha < -12) {
          ha += 24;
        }
        this.hourAngle = this.utility.decodeAngleFromMath(ha);
      }
    }
  }

  clearTimer() {
    window.clearInterval(this.intervalId);
  }

}
