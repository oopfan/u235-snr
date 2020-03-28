import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LocalStorageGuard, QuickStartGuard } from '@core/services';
import * as fromComponents from './components';

export const routes: Routes = [
  { path: 'calculators', component: fromComponents.CalculatorsHomeComponent, canActivate: [LocalStorageGuard, QuickStartGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CalculatorsRoutingModule { }
