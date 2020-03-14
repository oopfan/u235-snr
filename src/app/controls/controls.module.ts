import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { InputNumberComponent } from './input-number/input-number.component';
import { InputTextComponent } from './input-text/input-text.component';

@NgModule({
  declarations: [
    InputNumberComponent,
    InputTextComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    InputNumberComponent,
    InputTextComponent
  ]
})
export class ControlsModule { }
