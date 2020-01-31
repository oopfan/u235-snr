import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CalculatorsRoutingModule } from './calculators-routing.module';
import { CalculatorsHomeComponent } from './calculators-home/calculators-home.component';


@NgModule({
  declarations: [CalculatorsHomeComponent],
  imports: [
    CommonModule,
    CalculatorsRoutingModule
  ]
})
export class CalculatorsModule { }
