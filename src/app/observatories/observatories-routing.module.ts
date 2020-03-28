import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LocalStorageGuard, QuickStartGuard } from '@core/services';
import * as fromComponents from './components';

export const routes: Routes = [
  { path: 'observatories', component: fromComponents.ObservatoriesHomeComponent, canActivate: [LocalStorageGuard, QuickStartGuard] },
  { path: 'new-observatory', component: fromComponents.ObservatoryCreateComponent, canActivate: [LocalStorageGuard, QuickStartGuard] },
  { path: 'edit-observatory/:id', component: fromComponents.ObservatoryEditComponent, canActivate: [LocalStorageGuard, QuickStartGuard] },
  { path: 'delete-observatory/:id', component: fromComponents.ObservatoryDeleteComponent, canActivate: [LocalStorageGuard, QuickStartGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ObservatoriesRoutingModule { }
