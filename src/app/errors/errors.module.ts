import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ErrorsRoutingModule } from './errors-routing.module';
import { ErrorsHomeComponent } from './errors-home/errors-home.component';


@NgModule({
  declarations: [ErrorsHomeComponent],
  imports: [
    CommonModule,
    ErrorsRoutingModule
  ]
})
export class ErrorsModule { }
