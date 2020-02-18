import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CamerasRoutingModule } from './cameras-routing.module';
import { CamerasHomeComponent } from './cameras-home/cameras-home.component';
import { CameraCreateComponent } from './camera-create/camera-create.component';
import { CameraDeleteComponent } from './camera-delete/camera-delete.component';
import { CameraEditComponent } from './camera-edit/camera-edit.component';
import { FormsModule } from '../forms/forms.module';

@NgModule({
  declarations: [CamerasHomeComponent, CameraCreateComponent, CameraDeleteComponent, CameraEditComponent],
  imports: [
    CommonModule,
    CamerasRoutingModule,
    FormsModule
  ]
})
export class CamerasModule { }
