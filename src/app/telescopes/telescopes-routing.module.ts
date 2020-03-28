import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LocalStorageGuard, QuickStartGuard } from '@core/services';
import * as fromComponents from './components';

export const routes: Routes = [
  { path: 'telescopes', component: fromComponents.TelescopesHomeComponent, canActivate: [LocalStorageGuard, QuickStartGuard] },
  { path: 'new-telescope', component: fromComponents.TelescopeCreateComponent, canActivate: [LocalStorageGuard, QuickStartGuard] },
  { path: 'edit-telescope/:id', component: fromComponents.TelescopeEditComponent, canActivate: [LocalStorageGuard, QuickStartGuard] },
  { path: 'delete-telescope/:id', component: fromComponents.TelescopeDeleteComponent, canActivate: [LocalStorageGuard, QuickStartGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TelescopesRoutingModule { }
