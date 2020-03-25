import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { TargetParsed, TelescopeParsed, CameraParsed, ObservatoryParsed } from '@core/services';

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

  constructor() {}

  ngOnInit() {
  }

  onChangeTarget(value: TargetParsed) {
    this.notifyChangeTarget.emit(value);
  }

  onChangeTelescope(value: TelescopeParsed) {
    this.notifyChangeTelescope.emit(value);
  }

  onChangeCamera(value: CameraParsed) {
    this.notifyChangeCamera.emit(value);
  }

  onChangeObservatory(value: ObservatoryParsed) {
    this.notifyChangeObservatory.emit(value);
  }

}
