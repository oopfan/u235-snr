import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TelescopeValidator } from './telescope-validator';

@NgModule({
  declarations: [ TelescopeValidator ],
  imports: [
    CommonModule
  ],
  exports: [
    TelescopeValidator
  ]
})
export class ValidatorsModule { }
