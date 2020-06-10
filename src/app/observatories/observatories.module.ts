import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { U235AstroModule } from 'u235-astro';

import * as fromComponents from './components';
import { ObservatoriesRoutingModule } from './observatories-routing.module';

@NgModule({
  declarations: [ ...fromComponents.components ],
  imports: [ CommonModule, SharedModule, ObservatoriesRoutingModule, U235AstroModule ]
})
export class ObservatoriesModule { }
