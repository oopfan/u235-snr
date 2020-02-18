import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TelescopesHomeComponent } from './telescopes-home/telescopes-home.component';
import { TelescopeCreateComponent } from './telescope-create/telescope-create.component';
import { LocalStorageGuard } from 'src/app/shared/local-storage-guard';

export const routes: Routes = [
  { path: 'telescopes', component: TelescopesHomeComponent, canActivate: [LocalStorageGuard] },
  { path: 'new-telescope', component: TelescopeCreateComponent, canActivate: [LocalStorageGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TelescopesRoutingModule { }
