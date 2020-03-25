import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { TargetParsed, TelescopeParsed, CameraParsed, ObservatoryParsed, UserTargetService, UserTelescopeService, UserCameraService, UserObservatoryService } from '@core/services';
import mapSort from 'mapsort';

@Component({
  selector: 'app-profile-picker',
  templateUrl: './profile-picker.component.html',
  styleUrls: ['./profile-picker.component.css']
})
export class ProfilePickerComponent implements OnInit {
  @Output() notifyChangeTarget: EventEmitter<TargetParsed> = new EventEmitter();
  @Output() notifyChangeTelescope: EventEmitter<TelescopeParsed> = new EventEmitter();
  @Output() notifyChangeCamera: EventEmitter<CameraParsed> = new EventEmitter();
  @Output() notifyChangeObservatory: EventEmitter<ObservatoryParsed> = new EventEmitter();

  targets: TargetParsed[] = [];
  telescopes: TelescopeParsed[] = [];
  cameras: CameraParsed[] = [];
  observatories: ObservatoryParsed[] = [];

  compareString = (a: any, b: any) => a.localeCompare(b);

  constructor(
    private targetService: UserTargetService,
    private telescopeService: UserTelescopeService,
    private cameraService: UserCameraService,
    private observatoryService: UserObservatoryService) {}

  validateTarget = (item: TargetParsed): boolean => {
    return this.targetService.validate(item) && item.rightAscension !== 1 && item.declination !== 1;
  }

  validateTelescope = (item: TelescopeParsed): boolean => {
    return this.telescopeService.validate(item);
  }

  validateCamera = (item: CameraParsed): boolean => {
    return this.cameraService.validate(item);
  }

  validateObservatory = (item: ObservatoryParsed): boolean => {
    return this.observatoryService.validate(item) && item.latitude !== 1 && item.longitude !== 1;
  }

  ngOnInit() {
    this.targets = mapSort(this.targetService.parseItems(this.targetService.getAll()).filter(this.validateTarget), element => element.name, this.compareString);
    this.telescopes = mapSort(this.telescopeService.parseItems(this.telescopeService.getAll()).filter(this.validateTelescope), element => element.name, this.compareString);
    this.cameras = mapSort(this.cameraService.parseItems(this.cameraService.getAll()).filter(this.validateCamera), element => element.name, this.compareString);
    this.observatories = mapSort(this.observatoryService.parseItems(this.observatoryService.getAll()).filter(this.validateObservatory), element => element.name, this.compareString);
  }

  onChangeTarget(value: string) {
    const id = parseInt(value);
    const target = isNaN(id) ? null: this.targetService.parseItems(this.targetService.getItem(id))[0];
    this.notifyChangeTarget.emit(target);
  }

  onChangeTelescope(value: string) {
    const id = parseInt(value);
    const telescope = isNaN(id) ? null : this.telescopeService.parseItems(this.telescopeService.getItem(id))[0];
    this.notifyChangeTelescope.emit(telescope);
  }

  onChangeCamera(value: string) {
    const id = parseInt(value);
    const camera = isNaN(id) ? null : this.cameraService.parseItems(this.cameraService.getItem(id))[0];
    this.notifyChangeCamera.emit(camera);
  }

  onChangeObservatory(value: string) {
    const id = parseInt(value);
    const observatory = isNaN(id) ? null : this.observatoryService.parseItems(this.observatoryService.getItem(id))[0];
    this.notifyChangeObservatory.emit(observatory);
  }

}
