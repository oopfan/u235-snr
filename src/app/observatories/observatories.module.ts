import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ControlsModule } from '../controls/controls.module';
import { ObservatoryFormComponent } from './observatory-form/observatory-form.component';

import { ObservatoriesRoutingModule } from './observatories-routing.module';
import { ObservatoriesHomeComponent } from './observatories-home/observatories-home.component';
import { ObservatoryCreateComponent } from './observatory-create/observatory-create.component';
import { ObservatoryEditComponent } from './observatory-edit/observatory-edit.component';
import { ObservatoryDeleteComponent } from './observatory-delete/observatory-delete.component';

@NgModule({
  declarations: [ObservatoriesHomeComponent, ObservatoryCreateComponent, ObservatoryDeleteComponent, ObservatoryEditComponent, ObservatoryFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ObservatoriesRoutingModule,
    ControlsModule
  ]
})
export class ObservatoriesModule { }
