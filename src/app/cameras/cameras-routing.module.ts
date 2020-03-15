import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LocalStorageGuard } from '@core/services';
import * as fromComponents from './components';

export const routes: Routes = [
  { path: 'cameras', component: fromComponents.CamerasHomeComponent, canActivate: [LocalStorageGuard] },
  { path: 'new-camera', component: fromComponents.CameraCreateComponent, canActivate: [LocalStorageGuard] },
  { path: 'edit-camera/:id', component: fromComponents.CameraEditComponent, canActivate: [LocalStorageGuard] },
  { path: 'delete-camera/:id', component: fromComponents.CameraDeleteComponent, canActivate: [LocalStorageGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CamerasRoutingModule { }
