import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SurfaceBrightnessCalculatorComponent } from './surface-brightness-calculator/surface-brightness-calculator.component';

@NgModule({
  declarations: [SurfaceBrightnessCalculatorComponent],
  imports: [
    CommonModule
  ],
  exports: [
    SurfaceBrightnessCalculatorComponent
  ]
})
export class SharedModule { }
