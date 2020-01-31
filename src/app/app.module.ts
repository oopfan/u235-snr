import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { LandingModule } from './landing/landing.module';
import { TargetsModule } from './targets/targets.module';
import { TelescopesModule } from './telescopes/telescopes.module';
import { CamerasModule } from './cameras/cameras.module';
import { ObservatoriesModule } from './observatories/observatories.module';
import { CalculatorsModule } from './calculators/calculators.module';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LandingModule,
    TargetsModule,
    TelescopesModule,
    CamerasModule,
    ObservatoriesModule,
    CalculatorsModule
  ],
  providers: [Title],
  bootstrap: [AppComponent]
})
export class AppModule { }
