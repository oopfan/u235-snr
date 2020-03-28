import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuickStartHomeComponent } from './quick-start-home/quick-start-home.component';

const routes: Routes = [{ path: 'quick-start', component: QuickStartHomeComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuickStartRoutingModule { }
