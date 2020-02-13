import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingHomeComponent } from './landing-home/landing-home.component';

export const routes: Routes = [
  { path: '', component: LandingHomeComponent },
  { path: 'home', component: LandingHomeComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LandingRoutingModule { }
