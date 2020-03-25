import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { ChartsModule } from 'ng2-charts';

import * as fromComponents from './components';
import { CalculatorsRoutingModule } from './calculators-routing.module';

@NgModule({
  declarations: [ ...fromComponents.components ],
  imports: [ CommonModule, SharedModule, ChartsModule, CalculatorsRoutingModule ]
})
export class CalculatorsModule { }
