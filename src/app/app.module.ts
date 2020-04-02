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
import { SharedModule } from './shared/shared.module';
import { HelpModule } from './help/help.module';
import { ErrorsModule } from './errors/errors.module';
import { QuickStartModule } from './quick-start/quick-start.module';
import { SandboxModule } from './sandbox/sandbox.module';
import { UtilitiesModule } from './utilities/utilities.module';
import { AssistantModule } from './assistant/assistant.module';
import { AnalyzerModule } from './analyzer/analyzer.module';
import { CoreModule } from './core/core.module';
import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    LandingModule,
    TargetsModule,
    TelescopesModule,
    CamerasModule,
    ObservatoriesModule,
    CalculatorsModule,
    SharedModule,
    HelpModule,
    ErrorsModule,
    QuickStartModule,
    SandboxModule,
    UtilitiesModule,
    AssistantModule,
    AnalyzerModule,
    CoreModule,
    AppRoutingModule
  ],
  providers: [Title],
  bootstrap: [AppComponent]
})
export class AppModule { }
