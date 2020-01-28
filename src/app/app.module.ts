import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { TargetsModule } from './targets/targets.module';
import { TelescopesModule } from './telescopes/telescopes.module';
import { CamerasModule } from './cameras/cameras.module';
import { ObservatoriesModule } from './observatories/observatories.module';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TargetsModule,
    TelescopesModule,
    CamerasModule,
    ObservatoriesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
