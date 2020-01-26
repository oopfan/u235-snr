import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SbcalcComponent } from './sbcalc/sbcalc.component';
import { TpeditComponent } from './tpedit/tpedit.component';

@NgModule({
  declarations: [
    AppComponent,
    SbcalcComponent,
    TpeditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
