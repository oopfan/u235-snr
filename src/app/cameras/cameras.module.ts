import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ControlsModule } from '../controls/controls.module';
import { CameraFormComponent } from './camera-form/camera-form.component';

import { CamerasRoutingModule } from './cameras-routing.module';
import { CamerasHomeComponent } from './cameras-home/cameras-home.component';
import { CameraCreateComponent } from './camera-create/camera-create.component';
import { CameraDeleteComponent } from './camera-delete/camera-delete.component';
import { CameraEditComponent } from './camera-edit/camera-edit.component';

@NgModule({
  declarations: [CamerasHomeComponent, CameraCreateComponent, CameraDeleteComponent, CameraEditComponent, CameraFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CamerasRoutingModule,
    ControlsModule
  ]
})
export class CamerasModule { }
