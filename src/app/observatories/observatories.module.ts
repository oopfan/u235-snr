import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ObservatoriesRoutingModule } from './observatories-routing.module';
import { ObservatoriesHomeComponent } from './observatories-home/observatories-home.component';
import { ObservatoryItemComponent } from './observatory-item/observatory-item.component';


@NgModule({
  declarations: [ObservatoriesHomeComponent, ObservatoryItemComponent],
  imports: [
    CommonModule,
    ObservatoriesRoutingModule
  ]
})
export class ObservatoriesModule { }
