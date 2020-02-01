import { Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { UserTargetService } from 'src/app/services/user-target.service';
import { UserTelescopeService } from 'src/app/services/user-telescope.service';
import { UserCameraService } from 'src/app/services/user-camera.service';
import { UserObservatoryService } from 'src/app/services/user-observatory.service';

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

  constructor(
    private titleService: Title, 
    private targetService: UserTargetService,
    private telescopeService: UserTelescopeService,
    private cameraService: UserCameraService,
    private observatoryService: UserObservatoryService) { }

  ngOnInit() {
    this.titleService.setTitle('Calculators | U235+SNR');
    this.targets = this.targetService.getAll();
    this.telescopes = this.telescopeService.getAll();
    this.cameras = this.cameraService.getAll();
    this.observatories = this.observatoryService.getAll();
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
