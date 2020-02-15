import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HelpHomeComponent } from './help-home/help-home.component';

export const routes: Routes = [
  { path: 'help', component: HelpHomeComponent },
  { path: 'help/:section', component: HelpHomeComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HelpRoutingModule { }
