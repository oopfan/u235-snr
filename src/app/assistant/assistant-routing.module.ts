import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LocalStorageGuard, QuickStartGuard } from '@core/services';
import * as fromComponents from './components';

const routes: Routes = [
  { path: 'assistant', component: fromComponents.AssistantHomeComponent, canActivate: [LocalStorageGuard, QuickStartGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssistantRoutingModule { }
