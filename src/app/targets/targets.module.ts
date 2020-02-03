import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TargetsRoutingModule } from './targets-routing.module';
import { TargetsHomeComponent } from './targets-home/targets-home.component';
import { TargetItemComponent } from './target-item/target-item.component';
import { SurfaceBrightnessCalculatorComponent } from './surface-brightness-calculator/surface-brightness-calculator.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [TargetsHomeComponent, TargetItemComponent, SurfaceBrightnessCalculatorComponent],
  imports: [
    CommonModule,
    TargetsRoutingModule,
    SharedModule
  ]
})
export class TargetsModule { }
