import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LocalStorageGuard } from 'app/shared/local-storage-guard';
import * as fromComponents from './components';

export const routes: Routes = [
  { path: 'telescopes', component: fromComponents.TelescopesHomeComponent, canActivate: [LocalStorageGuard] },
  { path: 'new-telescope', component: fromComponents.TelescopeCreateComponent, canActivate: [LocalStorageGuard] },
  { path: 'edit-telescope/:id', component: fromComponents.TelescopeEditComponent, canActivate: [LocalStorageGuard] },
  { path: 'delete-telescope/:id', component: fromComponents.TelescopeDeleteComponent, canActivate: [LocalStorageGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TelescopesRoutingModule { }
