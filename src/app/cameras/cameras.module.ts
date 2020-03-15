import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';

import * as fromComponents from './components';
import { CamerasRoutingModule } from './cameras-routing.module';

@NgModule({
  declarations: [ ...fromComponents.components ],
  imports: [ CommonModule, SharedModule, CamerasRoutingModule ]
})
export class CamerasModule { }
