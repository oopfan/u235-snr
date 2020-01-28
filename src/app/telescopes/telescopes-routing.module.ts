import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TelescopesHomeComponent } from './telescopes-home/telescopes-home.component';

const routes: Routes = [{ path: 'telescopes', component: TelescopesHomeComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TelescopesRoutingModule { }
