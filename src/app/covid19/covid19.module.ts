import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Covid19RoutingModule } from './covid19-routing.module';
import { Covid19HomeComponent } from './covid19-home/covid19-home.component';


@NgModule({
  declarations: [Covid19HomeComponent],
  imports: [
    CommonModule,
    Covid19RoutingModule
  ]
})
export class Covid19Module { }
