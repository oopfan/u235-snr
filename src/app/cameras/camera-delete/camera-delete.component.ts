import { Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserCameraService, CameraStored } from '../../services/user-camera.service'

@Component({
  selector: 'app-camera-delete',
  templateUrl: './camera-delete.component.html',
  styleUrls: ['./camera-delete.component.css']
})
export class CameraDeleteComponent implements OnInit {
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
    this.titleService.setTitle('Delete Camera | U235+SNR');
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

  onSubmit() {
    this.cameraService.delete(
      this.camera.id
    );
    this.router.navigate(['/cameras']);
  }

  onCancel() {
    this.router.navigate(['/cameras']);
  }

}