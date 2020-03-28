import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LocalStorageGuard, QuickStartGuard } from '@core/services';
import * as fromComponents from './components';

export const routes: Routes = [
  { path: 'cameras', component: fromComponents.CamerasHomeComponent, canActivate: [LocalStorageGuard, QuickStartGuard] },
  { path: 'new-camera', component: fromComponents.CameraCreateComponent, canActivate: [LocalStorageGuard, QuickStartGuard] },
  { path: 'edit-camera/:id', component: fromComponents.CameraEditComponent, canActivate: [LocalStorageGuard, QuickStartGuard] },
  { path: 'delete-camera/:id', component: fromComponents.CameraDeleteComponent, canActivate: [LocalStorageGuard, QuickStartGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CamerasRoutingModule { }
