import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HelpRoutingModule } from './help-routing.module';
import { HelpHomeComponent } from './help-home/help-home.component';

@NgModule({
  declarations: [HelpHomeComponent],
  imports: [
    CommonModule,
    HelpRoutingModule
  ]
})
export class HelpModule { }
