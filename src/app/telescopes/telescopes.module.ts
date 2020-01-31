import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TelescopesRoutingModule } from './telescopes-routing.module';
import { TelescopesHomeComponent } from './telescopes-home/telescopes-home.component';
import { TelescopeItemComponent } from './telescope-item/telescope-item.component';


@NgModule({
  declarations: [TelescopesHomeComponent, TelescopeItemComponent],
  imports: [
    CommonModule,
    TelescopesRoutingModule
  ]
})
export class TelescopesModule { }
