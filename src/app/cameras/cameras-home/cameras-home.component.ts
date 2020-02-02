import { Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import { UserCameraService } from 'src/app/services/user-camera.service';

@Component({
  selector: 'app-cameras-home',
  templateUrl: './cameras-home.component.html',
  styleUrls: ['./cameras-home.component.css']
})
export class CamerasHomeComponent implements OnInit {

  constructor(private titleService: Title, private cameraService: UserCameraService) { }

  cameras = [];

  ngOnInit() {
    this.titleService.setTitle('Cameras | U235+SNR');
    this.cameraService.sort();
    this.cameras = this.cameraService.getAll();
  }

  onNew() {
    this.cameraService.create('', '', '', '', '');
    this.cameras = this.cameraService.getAll();
  }

  onSaveAll() {
    this.cameraService.saveAll();
  }

  onDiscard() {
    this.cameraService.discard();
    this.cameras = this.cameraService.getAll();
  }

  onUpdate(camera: any) {
    this.cameraService.update(camera.id, camera.name, camera.pixelSize, camera.readNoise, camera.darkCurrent, camera.quantumEfficiency);
  }

  onDelete(id: number) {
    this.cameraService.delete(id);
    this.cameras = this.cameraService.getAll();
  }

  onSave(id: number) {
    // Right now, can't save an individual camera to Local Storage, just all cameras.
    this.cameraService.saveAll();
  }

}
