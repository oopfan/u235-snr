import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TargetsRoutingModule } from './targets-routing.module';
import { TargetsHomeComponent } from './targets-home/targets-home.component';
import { TargetItemComponent } from './target-item/target-item.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [TargetsHomeComponent, TargetItemComponent],
  imports: [
    CommonModule,
    TargetsRoutingModule,
    SharedModule
  ]
})
export class TargetsModule { }
