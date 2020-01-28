import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CamerasRoutingModule } from './cameras-routing.module';
import { CamerasHomeComponent } from './cameras-home/cameras-home.component';


@NgModule({
  declarations: [CamerasHomeComponent],
  imports: [
    CommonModule,
    CamerasRoutingModule
  ]
})
export class CamerasModule { }
