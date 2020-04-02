import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { Title } from '@angular/platform-browser';
import { TargetParsed, TelescopeParsed, CameraParsed, ObservatoryParsed } from '@core/services';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-analyzer-home',
  templateUrl: './analyzer-home.component.html',
  styleUrls: ['./analyzer-home.component.css']
})
export class AnalyzerHomeComponent implements OnInit {
  pageTitle = 'Analyzer';
  browserTitle = this.pageTitle + ' | U235+SNR';

  target: TargetParsed = null;
  telescope: TelescopeParsed = null;
  camera: CameraParsed = null;
  observatory: ObservatoryParsed = null;

  targetSubject: Subject<TargetParsed> = new Subject<TargetParsed>();
  telescopeSubject: Subject<TelescopeParsed> = new Subject<TelescopeParsed>();
  cameraSubject: Subject<CameraParsed> = new Subject<CameraParsed>();
  observatorySubject: Subject<ObservatoryParsed> = new Subject<ObservatoryParsed>();

  redBalance: number = 1.71;
  greenBalance: number = 1;
  blueBalance: number = 1.55;
  colorBalanceSubject: Subject<any> = new Subject<any>();

  constructor(
    private titleService: Title,
    private router: Router) {}

  ngOnInit() {
    this.titleService.setTitle(this.browserTitle);
  }

  haveTarget(): boolean {
    return !!this.target;
  }

  haveTelescope(): boolean {
    return !!this.telescope;
  }

  haveCamera(): boolean {
    return !!this.camera;
  }

  haveObservatory(): boolean {
    return !!this.observatory;
  }

  onChangeTarget(value: TargetParsed) {
    this.target = value;
    if (this.target) {
      this.targetSubject.next(this.target);
    }
  }

  onChangeTelescope(value: TelescopeParsed) {
    this.telescope = value;
    if (this.telescope) {
      this.telescopeSubject.next(this.telescope);
    }
  }

  onChangeCamera(value: CameraParsed) {
    this.camera = value;
    if (this.camera) {
      this.cameraSubject.next(this.camera);
    }
  }

  onChangeObservatory(value: ObservatoryParsed) {
    this.observatory = value;
    if (this.observatory) {
      this.observatorySubject.next(this.observatory);
    }
  }

  onColorBalance(value: any) {
    this.colorBalanceSubject.next(value);
  }

  onHelp(section: string) {
    this.router.navigate(['/help', section]);
  }

}
