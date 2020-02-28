import { Title } from '@angular/platform-browser';
import { Router } from "@angular/router";
import { Component, OnInit } from '@angular/core';
import { UserCameraService, CameraStored } from 'src/app/services/user-camera.service';

@Component({
  selector: 'app-cameras-home',
  templateUrl: './cameras-home.component.html',
  styleUrls: ['./cameras-home.component.css']
})
export class CamerasHomeComponent implements OnInit {
  browserTitle = 'Cameras | U235+SNR';
  pageTitle = 'Cameras';
  cameras = [];

  constructor(private titleService: Title, private router: Router, private cameraService: UserCameraService) { }

  ngOnInit() {
    this.titleService.setTitle(this.browserTitle);
    this.cameras = this.cameraService.getAll();
    this.cameras.sort((a: CameraStored, b: CameraStored) => a.name.localeCompare(b.name));
  }

  onHelp(section: string) {
    this.router.navigate(['/help', section]);
  }

  onNew() {
    this.router.navigate(['/new-camera']);
  }

  onEdit(id: number) {
    this.router.navigate(['/edit-camera', id]);
  }

  onDelete(id: number) {
    this.router.navigate(['/delete-camera', id]);
  }

}
