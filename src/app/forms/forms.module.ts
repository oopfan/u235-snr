import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ControlsModule } from '../controls/controls.module';
import { TelescopeFormComponent } from './telescope-form/telescope-form.component';
import { CameraFormComponent } from './camera-form/camera-form.component';

@NgModule({
  declarations: [TelescopeFormComponent, CameraFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ControlsModule
  ],
  exports: [
    TelescopeFormComponent,
    CameraFormComponent
  ]
})
export class FormsModule { }
