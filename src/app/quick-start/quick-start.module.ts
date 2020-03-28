import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuickStartRoutingModule } from './quick-start-routing.module';
import { QuickStartHomeComponent } from './quick-start-home/quick-start-home.component';


@NgModule({
  declarations: [QuickStartHomeComponent],
  imports: [
    CommonModule,
    QuickStartRoutingModule
  ]
})
export class QuickStartModule { }
