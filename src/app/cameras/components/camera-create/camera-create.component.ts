import { Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { UserCameraService, CameraParsed } from '@core/services';

@Component({
  selector: 'app-camera-create',
  templateUrl: './camera-create.component.html',
  styleUrls: ['./camera-create.component.css']
})
export class CameraCreateComponent implements OnInit {
  browserTitle = 'New Camera | U235+SNR';
  pageTitle = 'New Camera';
  navigateToUrl = '/cameras';

  constructor(private titleService: Title, private cameraService: UserCameraService, private router: Router) { }

  ngOnInit() {
    this.titleService.setTitle(this.browserTitle);
  }

  onSubmit(value: CameraParsed) {
    this.cameraService.create(
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
