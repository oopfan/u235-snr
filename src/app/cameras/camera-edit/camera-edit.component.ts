import { Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserCameraService, CameraStored, CameraParsed } from '../../services/user-camera.service'

@Component({
  selector: 'app-camera-edit',
  templateUrl: './camera-edit.component.html',
  styleUrls: ['./camera-edit.component.css']
})
export class CameraEditComponent implements OnInit {
  browserTitle = 'Edit Camera | U235+SNR';
  pageTitle = 'Edit Camera';
  cameraNotFound = 'Camera not found';
  navigateToUrl = '/cameras';

  camera: CameraStored = {
    id: -1,
    name: '',
    pixelSize: '',
    readNoise: '',
    darkCurrent: '',
    quantumEfficiency: ''
  };

  constructor(private titleService: Title, private activatedRoute: ActivatedRoute, private router: Router, private cameraService: UserCameraService) { }

  ngOnInit() {
    this.titleService.setTitle(this.browserTitle);
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      const idNum = parseInt(id);
      if (!isNaN(idNum)) {
        const result = this.cameraService.getItem(idNum);
        if (result.length) {
          this.camera = result[0];
          return;
        }
      }
    }
  }

  onSubmit(value: CameraParsed) {
    this.cameraService.update(
      this.camera.id,
      value.name,
      '' + value.pixelSize,
      '' + value.readNoise,
      '' + value.darkCurrent,
      '' + value.quantumEfficiency
    );

    this.router.navigate([ this.navigateToUrl ]);
  }

  onCancel() {
    this.router.navigate([ this.navigateToUrl ]);
  }

}
