import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ObservatoriesHomeComponent } from './observatories-home/observatories-home.component';
import { ObservatoryCreateComponent } from './observatory-create/observatory-create.component';
import { ObservatoryEditComponent } from './observatory-edit/observatory-edit.component';
import { ObservatoryDeleteComponent } from './observatory-delete/observatory-delete.component';
import { LocalStorageGuard } from 'app/shared/local-storage-guard';

export const routes: Routes = [
  { path: 'observatories', component: ObservatoriesHomeComponent, canActivate: [LocalStorageGuard] },
  { path: 'new-observatory', component: ObservatoryCreateComponent, canActivate: [LocalStorageGuard] },
  { path: 'edit-observatory/:id', component: ObservatoryEditComponent, canActivate: [LocalStorageGuard] },
  { path: 'delete-observatory/:id', component: ObservatoryDeleteComponent, canActivate: [LocalStorageGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ObservatoriesRoutingModule { }
