import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HelpRoutingModule } from './help-routing.module';
import { HelpHomeComponent } from './help-home/help-home.component';
import { HelpDetailComponent } from './help-detail/help-detail.component';

@NgModule({
  declarations: [HelpHomeComponent, HelpDetailComponent],
  imports: [
    CommonModule,
    HelpRoutingModule
  ]
})
export class HelpModule { }
