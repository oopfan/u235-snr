import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ControlsModule } from '../controls/controls.module';
import { TelescopeFormComponent } from './telescope-form/telescope-form.component';

import { TelescopesRoutingModule } from './telescopes-routing.module';
import { TelescopesHomeComponent } from './telescopes-home/telescopes-home.component';
import { TelescopeCreateComponent } from './telescope-create/telescope-create.component';
import { TelescopeEditComponent } from './telescope-edit/telescope-edit.component';
import { TelescopeDeleteComponent } from './telescope-delete/telescope-delete.component';

@NgModule({
  declarations: [TelescopesHomeComponent, TelescopeCreateComponent, TelescopeEditComponent, TelescopeDeleteComponent, TelescopeFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TelescopesRoutingModule,
    ControlsModule
  ]
})
export class TelescopesModule { }
