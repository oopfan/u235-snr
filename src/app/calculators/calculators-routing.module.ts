import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CalculatorsHomeComponent } from './calculators-home/calculators-home.component';

const routes: Routes = [
  { path: 'calculators', component: CalculatorsHomeComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CalculatorsRoutingModule { }
