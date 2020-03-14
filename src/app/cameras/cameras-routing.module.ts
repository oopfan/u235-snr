import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CamerasHomeComponent } from './cameras-home/cameras-home.component';
import { CameraCreateComponent } from './camera-create/camera-create.component';
import { CameraEditComponent } from './camera-edit/camera-edit.component';
import { CameraDeleteComponent } from './camera-delete/camera-delete.component';
import { LocalStorageGuard } from 'app/shared/local-storage-guard';

export const routes: Routes = [
  { path: 'cameras', component: CamerasHomeComponent, canActivate: [LocalStorageGuard] },
  { path: 'new-camera', component: CameraCreateComponent, canActivate: [LocalStorageGuard] },
  { path: 'edit-camera/:id', component: CameraEditComponent, canActivate: [LocalStorageGuard] },
  { path: 'delete-camera/:id', component: CameraDeleteComponent, canActivate: [LocalStorageGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CamerasRoutingModule { }
