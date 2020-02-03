import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CalculatorsHomeComponent } from './calculators-home/calculators-home.component';
import { LocalStorageGuard } from 'src/app/shared/local-storage-guard';

const routes: Routes = [
  { path: 'calculators', component: CalculatorsHomeComponent, canActivate: [LocalStorageGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CalculatorsRoutingModule { }
