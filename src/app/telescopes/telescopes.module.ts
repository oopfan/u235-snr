import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TelescopesRoutingModule } from './telescopes-routing.module';
import { TelescopesHomeComponent } from './telescopes-home/telescopes-home.component';
import { TelescopeCreateComponent } from './telescope-create/telescope-create.component';
import { TelescopeEditComponent } from './telescope-edit/telescope-edit.component';
import { TelescopeDeleteComponent } from './telescope-delete/telescope-delete.component';
import { FormsModule } from '../forms/forms.module';

@NgModule({
  declarations: [TelescopesHomeComponent, TelescopeCreateComponent, TelescopeEditComponent, TelescopeDeleteComponent],
  imports: [
    CommonModule,
    TelescopesRoutingModule,
    FormsModule
  ]
})
export class TelescopesModule { }
