import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LocalStorageGuard } from '@core/services';
import * as fromComponents from './components';

export const routes: Routes = [
  { path: 'observatories', component: fromComponents.ObservatoriesHomeComponent, canActivate: [LocalStorageGuard] },
  { path: 'new-observatory', component: fromComponents.ObservatoryCreateComponent, canActivate: [LocalStorageGuard] },
  { path: 'edit-observatory/:id', component: fromComponents.ObservatoryEditComponent, canActivate: [LocalStorageGuard] },
  { path: 'delete-observatory/:id', component: fromComponents.ObservatoryDeleteComponent, canActivate: [LocalStorageGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ObservatoriesRoutingModule { }
