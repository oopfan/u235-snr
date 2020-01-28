import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TelescopesRoutingModule } from './telescopes-routing.module';
import { TelescopesHomeComponent } from './telescopes-home/telescopes-home.component';


@NgModule({
  declarations: [TelescopesHomeComponent],
  imports: [
    CommonModule,
    TelescopesRoutingModule
  ]
})
export class TelescopesModule { }
