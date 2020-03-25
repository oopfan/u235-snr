import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CameraParsed, UserCameraService } from '@core/services';
import mapSort from 'mapsort';

@Component({
  selector: 'app-camera-picker',
  templateUrl: './camera-picker.component.html',
  styleUrls: ['./camera-picker.component.css']
})
export class CameraPickerComponent implements OnInit {

  @Output() notifyChange: EventEmitter<CameraParsed> = new EventEmitter();
  cameras: CameraParsed[] = [];
  compareString = (a: any, b: any) => a.localeCompare(b);

  constructor(private cameraService: UserCameraService) {}

  validateCamera = (item: CameraParsed): boolean => {
    return this.cameraService.validate(item);
  }

  ngOnInit() {
    this.cameras = mapSort(this.cameraService.parseItems(this.cameraService.getAll()).filter(this.validateCamera), element => element.name, this.compareString);
  }

  onChangeCamera(value: string) {
    const id = parseInt(value);
    const camera = isNaN(id) ? null : this.cameraService.parseItems(this.cameraService.getItem(id))[0];
    this.notifyChange.emit(camera);
  }

}
