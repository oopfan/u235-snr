import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TelescopesHomeComponent } from './telescopes-home/telescopes-home.component';
import { LocalStorageGuard } from 'src/app/shared/local-storage-guard';

export const routes: Routes = [
  { path: 'telescopes', component: TelescopesHomeComponent, canActivate: [LocalStorageGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TelescopesRoutingModule { }
