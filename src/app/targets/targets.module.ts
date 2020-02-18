import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ControlsModule } from '../controls/controls.module';
import { TargetFormComponent } from './target-form/target-form.component';

import { TargetsRoutingModule } from './targets-routing.module';
import { TargetsHomeComponent } from './targets-home/targets-home.component';
import { TargetCreateComponent } from './target-create/target-create.component';
import { TargetEditComponent } from './target-edit/target-edit.component';
import { TargetDeleteComponent } from './target-delete/target-delete.component';
import { SurfaceBrightnessCalculatorComponent } from './surface-brightness-calculator/surface-brightness-calculator.component';

@NgModule({
  declarations: [
    TargetsHomeComponent,
    TargetFormComponent,
    TargetCreateComponent,
    TargetEditComponent,
    TargetDeleteComponent,
    SurfaceBrightnessCalculatorComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TargetsRoutingModule,
    ControlsModule
  ]
})
export class TargetsModule { }
