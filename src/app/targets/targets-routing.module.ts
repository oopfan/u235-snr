import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LocalStorageGuard, QuickStartGuard } from '@core/services';
import * as fromComponents from './components';

export const routes: Routes = [
  { path: 'targets', component: fromComponents.TargetsHomeComponent, canActivate: [LocalStorageGuard, QuickStartGuard] },
  { path: 'new-target', component: fromComponents.TargetCreateComponent, canActivate: [LocalStorageGuard, QuickStartGuard] },
  { path: 'edit-target/:id', component: fromComponents.TargetEditComponent, canActivate: [LocalStorageGuard, QuickStartGuard] },
  { path: 'delete-target/:id', component: fromComponents.TargetDeleteComponent, canActivate: [LocalStorageGuard, QuickStartGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TargetsRoutingModule { }
