import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CamerasRoutingModule } from './cameras-routing.module';
import { CamerasHomeComponent } from './cameras-home/cameras-home.component';
import { CameraItemComponent } from './camera-item/camera-item.component';


@NgModule({
  declarations: [CamerasHomeComponent, CameraItemComponent],
  imports: [
    CommonModule,
    CamerasRoutingModule
  ]
})
export class CamerasModule { }
