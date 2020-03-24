import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TargetParsed, TelescopeParsed, CameraParsed, ObservatoryParsed, UserTargetService, UserTelescopeService, UserCameraService, UserObservatoryService } from '@core/services';
import { Subject } from 'rxjs';
import mapSort from 'mapsort';

@Component({
  selector: 'app-analyzer-home',
  templateUrl: './analyzer-home.component.html',
  styleUrls: ['./analyzer-home.component.css']
})
export class AnalyzerHomeComponent implements OnInit, OnDestroy {
  browserTitle = 'Analyzer | U235+SNR';

  targets: TargetParsed[] = [];
  telescopes: TelescopeParsed[] = [];
  cameras: CameraParsed[] = [];
  observatories: ObservatoryParsed[] = [];

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

  compareString = (a: any, b: any) => a.localeCompare(b);

  constructor(
    private titleService: Title,
    private targetService: UserTargetService,
    private telescopeService: UserTelescopeService,
    private cameraService: UserCameraService,
    private observatoryService: UserObservatoryService) {}

  ngOnInit() {
    this.titleService.setTitle(this.browserTitle);
    this.targets = mapSort(this.targetService.parseItems(this.targetService.getAll()).filter(this.targetService.validate), element => element.name, this.compareString);
    this.telescopes = mapSort(this.telescopeService.parseItems(this.telescopeService.getAll()).filter(this.telescopeService.validate), element => element.name, this.compareString);
    this.cameras = mapSort(this.cameraService.parseItems(this.cameraService.getAll()).filter(this.cameraService.validate), element => element.name, this.compareString);
    this.observatories = mapSort(this.observatoryService.parseItems(this.observatoryService.getAll()).filter(this.observatoryService.validate), element => element.name, this.compareString);
  }

  ngOnDestroy() {
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

  invalidTarget(): boolean {
    return this.target.rightAscension === 1 || this.target.declination === 1;
  }

  invalidObservatory(): boolean {
    return this.observatory.latitude === 1 || this.observatory.longitude === 1;
  }

  onChangeTarget(value: string) {
    const id = parseInt(value);
    if (!isNaN(id)) {
      this.target = this.targetService.parseItems(this.targetService.getItem(id))[0];
      this.targetSubject.next(this.target);
    }
    else {
      this.target = null;
    }
  }

  onChangeTelescope(value: string) {
    const id = parseInt(value);
    if (!isNaN(id)) {
      this.telescope = this.telescopeService.parseItems(this.telescopeService.getItem(id))[0];
      this.telescopeSubject.next(this.telescope);
    }
    else {
      this.telescope = null;
    }
  }

  onChangeCamera(value: string) {
    const id = parseInt(value);
    if (!isNaN(id)) {
      this.camera = this.cameraService.parseItems(this.cameraService.getItem(id))[0];
      this.cameraSubject.next(this.camera);
    }
    else {
      this.camera = null;
    }
  }

  onChangeObservatory(value: string) {
    const id = parseInt(value);
    if (!isNaN(id)) {
      this.observatory = this.observatoryService.parseItems(this.observatoryService.getItem(id))[0];
      this.observatorySubject.next(this.observatory);
    }
    else {
      this.observatory = null;
    }
  }

  onColorBalance(value: any) {
    this.colorBalanceSubject.next(value);
  }

}
