import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CalculatorsRoutingModule } from './calculators-routing.module';
import { CalculatorsHomeComponent } from './calculators-home/calculators-home.component';
import { CalculatorSnrComponent } from './calculator-snr/calculator-snr.component';
import { CalculatorFcComponent } from './calculator-fc/calculator-fc.component';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [CalculatorsHomeComponent, CalculatorSnrComponent, CalculatorFcComponent],
  imports: [
    CommonModule,
    CalculatorsRoutingModule,
    ChartsModule
  ]
})
export class CalculatorsModule { }
