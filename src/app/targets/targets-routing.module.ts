import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TargetsHomeComponent } from './targets-home/targets-home.component';
import { LocalStorageGuard } from 'src/app/shared/local-storage-guard';

const routes: Routes = [
  { path: 'targets', component: TargetsHomeComponent, canActivate: [LocalStorageGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TargetsRoutingModule { }
