import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CamerasHomeComponent } from './cameras-home/cameras-home.component';

const routes: Routes = [
  { path: 'cameras', component: CamerasHomeComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CamerasRoutingModule { }
