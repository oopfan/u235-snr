import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ControlsModule } from '../controls/controls.module';
import { TelescopeFormComponent } from './telescope-form/telescope-form.component';

@NgModule({
  declarations: [TelescopeFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ControlsModule
  ],
  exports: [
    TelescopeFormComponent
  ]
})
export class FormsModule { }
