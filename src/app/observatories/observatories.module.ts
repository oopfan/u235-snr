import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ObservatoriesRoutingModule } from './observatories-routing.module';
import { ObservatoriesHomeComponent } from './observatories-home/observatories-home.component';


@NgModule({
  declarations: [ObservatoriesHomeComponent],
  imports: [
    CommonModule,
    ObservatoriesRoutingModule
  ]
})
export class ObservatoriesModule { }
