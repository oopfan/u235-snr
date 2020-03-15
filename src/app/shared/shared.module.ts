import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import * as fromComponents from './components';

@NgModule({
  declarations: [ ...fromComponents.components ],
  imports: [ CommonModule, ReactiveFormsModule ],
  exports: [ ReactiveFormsModule, ...fromComponents.components ]
})
export class SharedModule { }
