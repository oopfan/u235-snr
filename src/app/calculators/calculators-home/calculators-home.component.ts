import { Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
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
  calcChoice = '';
  targets = this.targetService.getAll();
  telescopes = this.telescopeService.getAll();
  cameras = this.cameraService.getAll();
  observatories = this.observatoryService.getAll();
  selectedTarget = "-";
  selectedTelescope = "-";
  selectedCamera = "-";
  selectedObservatory = "-";

  constructor(
    private titleService: Title, 
    private targetService: UserTargetService,
    private telescopeService: UserTelescopeService,
    private cameraService: UserCameraService,
    private observatoryService: UserObservatoryService) { }

  ngOnInit() {
    this.titleService.setTitle('Calculators | U235+SNR');
  }

  onChangeCalculator(value: string) {
    this.calcChoice = value;
  }

  onChangeTarget(value: string) {
    this.selectedTarget = value;
    this.evaluatePrerequisite();
  }

  onChangeTelescope(value: string) {
    this.selectedTelescope = value;
    this.evaluatePrerequisite();
  }

  onChangeCamera(value: string) {
    this.selectedCamera = value;
    this.evaluatePrerequisite();
  }

  onChangeObservatory(value: string) {
    this.selectedObservatory = value;
    this.evaluatePrerequisite();
  }

  evaluatePrerequisite() {
    this.prerequisiteMet = this.selectedTarget !== '-' && this.selectedTelescope !== '-' && this.selectedCamera !== '-' && this.selectedObservatory !== '-';
    if (this.prerequisiteMet == false) {
      this.calcChoice = ''
    }
  }
}
