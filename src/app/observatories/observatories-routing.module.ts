import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ObservatoriesHomeComponent } from './observatories-home/observatories-home.component';
import { LocalStorageGuard } from 'src/app/shared/local-storage-guard';

const routes: Routes = [
  { path: 'observatories', component: ObservatoriesHomeComponent, canActivate: [LocalStorageGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ObservatoriesRoutingModule { }
