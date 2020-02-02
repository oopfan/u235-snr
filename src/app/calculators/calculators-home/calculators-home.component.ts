import { Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { UserTargetService } from 'src/app/services/user-target.service';
import { UserTelescopeService } from 'src/app/services/user-telescope.service';
import { UserCameraService } from 'src/app/services/user-camera.service';
import { UserObservatoryService } from 'src/app/services/user-observatory.service';
import mapSort from 'mapsort';

@Component({
  selector: 'app-calculators-home',
  templateUrl: './calculators-home.component.html',
  styleUrls: ['./calculators-home.component.css']
})
export class CalculatorsHomeComponent implements OnInit {
  prerequisiteMet = false;
  calcChoice = '-';
  targets = [];
  telescopes = [];
  cameras = [];
  observatories = [];
  selectedTarget = "-";
  selectedTelescope = "-";
  selectedCamera = "-";
  selectedObservatory = "-";

  targetSubject: Subject<string> = new Subject<string>();
  telescopeSubject: Subject<string> = new Subject<string>();
  cameraSubject: Subject<string> = new Subject<string>();
  observatorySubject: Subject<string> = new Subject<string>();

  validateTarget = (element: any) => {
    const surfaceBrightness = parseFloat(element.surfaceBrightness);
    return (
      !isNaN(surfaceBrightness)
    );
  };

  validateTelescope = (element: any) => {
    const aperture = parseFloat(element.aperture);
    const focalLength = parseFloat(element.focalLength);
    const centralObstruction = parseFloat(element.centralObstruction);
    const totalReflectanceTransmittance = parseFloat(element.totalReflectanceTransmittance);
    return (
      !isNaN(aperture) && aperture > 0 && 
      !isNaN(focalLength) && focalLength > 0 && 
      !isNaN(centralObstruction) && centralObstruction >= 0 &&
      !isNaN(totalReflectanceTransmittance) && totalReflectanceTransmittance >= 0 && totalReflectanceTransmittance <= 1
      );
  };

  validateCamera = (element: any) => {
    const pixelSize = parseFloat(element.pixelSize);
    const readNoise = parseFloat(element.readNoise);
    const darkCurrent = parseFloat(element.darkCurrent);
    const quantumEfficiency = parseFloat(element.quantumEfficiency);
    return (
      !isNaN(pixelSize) && pixelSize > 0 &&
      !isNaN(readNoise) && readNoise >= 0 &&
      !isNaN(darkCurrent) && darkCurrent >= 0 &&
      !isNaN(quantumEfficiency) && quantumEfficiency >= 0 && quantumEfficiency <= 100
    );
  };

  validateObservatory = (element: any) => {
    const skyBrightness = parseFloat(element.skyBrightness);
    return (
      !isNaN(skyBrightness)
    );
  }

  constructor(
    private titleService: Title, 
    private targetService: UserTargetService,
    private telescopeService: UserTelescopeService,
    private cameraService: UserCameraService,
    private observatoryService: UserObservatoryService) { }

  ngOnInit() {
    this.titleService.setTitle('Calculators | U235+SNR');
    this.targets = mapSort(this.targetService.getAll().filter(this.validateTarget), element => element.name, (a, b) => a.localeCompare(b));
    this.telescopes = mapSort(this.telescopeService.getAll().filter(this.validateTelescope), element => element.name, (a, b) => a.localeCompare(b));
    this.cameras = mapSort(this.cameraService.getAll().filter(this.validateCamera), element => element.name, (a, b) => a.localeCompare(b));
    this.observatories = mapSort(this.observatoryService.getAll().filter(this.validateObservatory), element => element.name, (a, b) => a.localeCompare(b));
  }

  onChangeCalculator(value: string) {
    this.calcChoice = value;
  }

  onChangeTarget(value: string) {
    this.selectedTarget = value;
    this.evaluatePrerequisite();
    if (this.prerequisiteMet) {
      this.targetSubject.next(this.selectedTarget);
    }
  }

  onChangeTelescope(value: string) {
    this.selectedTelescope = value;
    this.evaluatePrerequisite();
    if (this.prerequisiteMet) {
      this.telescopeSubject.next(this.selectedTelescope);
    }
  }

  onChangeCamera(value: string) {
    this.selectedCamera = value;
    this.evaluatePrerequisite();
    if (this.prerequisiteMet) {
      this.cameraSubject.next(this.selectedCamera);
    }
  }

  onChangeObservatory(value: string) {
    this.selectedObservatory = value;
    this.evaluatePrerequisite();
    if (this.prerequisiteMet) {
      this.observatorySubject.next(this.selectedObservatory);
    }
  }

  evaluatePrerequisite() {
    this.prerequisiteMet = this.selectedTarget !== '-' && this.selectedTelescope !== '-' && this.selectedCamera !== '-' && this.selectedObservatory !== '-';
    if (this.prerequisiteMet == false) {
      this.calcChoice = '-'
    }
  }
}
