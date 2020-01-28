import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TargetsHomeComponent } from './targets-home/targets-home.component';

const routes: Routes = [{ path: 'targets', component: TargetsHomeComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TargetsRoutingModule { }
