import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TelescopesRoutingModule } from './telescopes-routing.module';
import { TelescopesHomeComponent } from './telescopes-home/telescopes-home.component';
import { TelescopeItemComponent } from './telescope-item/telescope-item.component';
import { TelescopeCreateComponent } from './telescope-create/telescope-create.component';
import { FormsModule } from '../forms/forms.module';

@NgModule({
  declarations: [TelescopesHomeComponent, TelescopeItemComponent, TelescopeCreateComponent],
  imports: [
    CommonModule,
    TelescopesRoutingModule,
    FormsModule
  ]
})
export class TelescopesModule { }
