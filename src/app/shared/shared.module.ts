import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import * as fromComponents from './components';
import * as fromDirectives from './directives';

@NgModule({
  declarations: [ ...fromComponents.components, ...fromDirectives.directives ],
  imports: [ CommonModule, ReactiveFormsModule ],
  exports: [ ReactiveFormsModule, ...fromComponents.components, ...fromDirectives.directives ]
})
export class SharedModule { }
