import { Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { UserCameraService, CameraParsed } from 'src/app/services/user-camera.service';

@Component({
  selector: 'app-camera-create',
  templateUrl: './camera-create.component.html',
  styleUrls: ['./camera-create.component.css']
})
export class CameraCreateComponent implements OnInit {

  constructor(private titleService: Title, private cameraService: UserCameraService, private router: Router) { }

  ngOnInit() {
    this.titleService.setTitle('New Camera | U235+SNR');
  }

  onSubmit(value: CameraParsed) {
    this.cameraService.create(
      value.name,
      '' + value.pixelSize,
      '' + value.readNoise,
      '' + value.darkCurrent,
      '' + value.quantumEfficiency
    );
    this.router.navigate(['/cameras']);
  }

  onCancel() {
    this.router.navigate(['/cameras']);
  }

}
