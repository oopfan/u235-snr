import { Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { TargetParsed, TelescopeParsed, CameraParsed, ObservatoryParsed } from '@core/services';
import mapSort from 'mapsort';

@Component({
  selector: 'app-calculators-home',
  templateUrl: './calculators-home.component.html',
  styleUrls: ['./calculators-home.component.css']
})
export class CalculatorsHomeComponent implements OnInit {
  prerequisiteMet = false;
  calcChoice = '-';
  selectedTarget: TargetParsed = null;
  selectedTelescope: TelescopeParsed = null;
  selectedCamera: CameraParsed = null;
  selectedObservatory: ObservatoryParsed = null;

  targetSubject: Subject<TargetParsed> = new Subject<TargetParsed>();
  telescopeSubject: Subject<TelescopeParsed> = new Subject<TelescopeParsed>();
  cameraSubject: Subject<CameraParsed> = new Subject<CameraParsed>();
  observatorySubject: Subject<ObservatoryParsed> = new Subject<ObservatoryParsed>();

  constructor(private titleService: Title) { }

  ngOnInit() {
    this.titleService.setTitle('Calculators | U235+SNR');
  }

  onChangeCalculator(value: string) {
    this.calcChoice = value;
  }

  onChangeTarget(value: TargetParsed) {
    this.selectedTarget = value;
    this.evaluatePrerequisite();
    if (this.prerequisiteMet) {
      this.targetSubject.next(this.selectedTarget);
    }
  }

  onChangeTelescope(value: TelescopeParsed) {
    this.selectedTelescope = value;
    this.evaluatePrerequisite();
    if (this.prerequisiteMet) {
      this.telescopeSubject.next(this.selectedTelescope);
    }
  }

  onChangeCamera(value: CameraParsed) {
    this.selectedCamera = value;
    this.evaluatePrerequisite();
    if (this.prerequisiteMet) {
      this.cameraSubject.next(this.selectedCamera);
    }
  }

  onChangeObservatory(value: ObservatoryParsed) {
    this.selectedObservatory = value;
    this.evaluatePrerequisite();
    if (this.prerequisiteMet) {
      this.observatorySubject.next(this.selectedObservatory);
    }
  }

  evaluatePrerequisite() {
    this.prerequisiteMet = this.selectedTarget !== null && this.selectedTelescope !== null && this.selectedCamera !== null && this.selectedObservatory !== null;
    if (this.prerequisiteMet == false) {
      this.calcChoice = '-'
    }
  }
}
