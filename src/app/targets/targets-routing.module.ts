import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LocalStorageGuard } from 'app/shared/local-storage-guard';
import * as fromComponents from './components';

export const routes: Routes = [
  { path: 'targets', component: fromComponents.TargetsHomeComponent, canActivate: [LocalStorageGuard] },
  { path: 'new-target', component: fromComponents.TargetCreateComponent, canActivate: [LocalStorageGuard] },
  { path: 'edit-target/:id', component: fromComponents.TargetEditComponent, canActivate: [LocalStorageGuard] },
  { path: 'delete-target/:id', component: fromComponents.TargetDeleteComponent, canActivate: [LocalStorageGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TargetsRoutingModule { }
