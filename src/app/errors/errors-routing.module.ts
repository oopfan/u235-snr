import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ErrorsHomeComponent } from './errors-home/errors-home.component';

const routes: Routes = [{ path: 'errors', component: ErrorsHomeComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ErrorsRoutingModule { }
