import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TargetsHomeComponent } from './targets-home/targets-home.component';
import { TargetCreateComponent } from './target-create/target-create.component';
import { TargetEditComponent } from './target-edit/target-edit.component';
import { TargetDeleteComponent } from './target-delete/target-delete.component';
import { LocalStorageGuard } from 'app/shared/local-storage-guard';

export const routes: Routes = [
  { path: 'targets', component: TargetsHomeComponent, canActivate: [LocalStorageGuard] },
  { path: 'new-target', component: TargetCreateComponent, canActivate: [LocalStorageGuard] },
  { path: 'edit-target/:id', component: TargetEditComponent, canActivate: [LocalStorageGuard] },
  { path: 'delete-target/:id', component: TargetDeleteComponent, canActivate: [LocalStorageGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TargetsRoutingModule { }
