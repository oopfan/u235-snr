import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Covid19HomeComponent } from './covid19-home/covid19-home.component';

export const routes: Routes = [
  { path: 'covid19', component: Covid19HomeComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Covid19RoutingModule { }
