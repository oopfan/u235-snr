import { Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import { UserDataService } from 'src/app/user-data.service';

@Component({
  selector: 'app-cameras-home',
  templateUrl: './cameras-home.component.html',
  styleUrls: ['./cameras-home.component.css']
})
export class CamerasHomeComponent implements OnInit {

  constructor(private titleService: Title, private userData: UserDataService) { }

  ngOnInit() {
    this.titleService.setTitle('Cameras | U235+SNR');
  }

  userCameraProfiles = this.userData.getAllCameras();

  onNewCamera() {
    const camera = this.userData.createCamera('', '', '', '', '');
    this.userCameraProfiles = this.userData.getAllCameras();
  }

  onSaveAll() {
    this.userData.saveCameras();
  }

  onDiscardChanges() {
    this.userData.discardCameras();
    this.userCameraProfiles = this.userData.getAllCameras();
  }

  onUpdateCamera(camera: any) {
    this.userData.updateCamera(camera.id, camera.name, camera.pixelSize, camera.readNoise, camera.darkCurrent, camera.quantumEfficiency);
  }

  onDeleteCamera(id: number) {
    this.userData.deleteCamera(id);
    this.userCameraProfiles = this.userData.getAllCameras();
  }

}
