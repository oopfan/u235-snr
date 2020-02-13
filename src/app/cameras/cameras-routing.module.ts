import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CamerasHomeComponent } from './cameras-home/cameras-home.component';
import { LocalStorageGuard } from 'src/app/shared/local-storage-guard';

export const routes: Routes = [
  { path: 'cameras', component: CamerasHomeComponent, canActivate: [LocalStorageGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CamerasRoutingModule { }
