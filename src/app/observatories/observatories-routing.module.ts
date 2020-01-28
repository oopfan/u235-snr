import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ObservatoriesHomeComponent } from './observatories-home/observatories-home.component';

const routes: Routes = [
  { path: 'observatories', component: ObservatoriesHomeComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ObservatoriesRoutingModule { }
