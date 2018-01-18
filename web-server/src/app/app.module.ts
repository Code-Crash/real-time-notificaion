import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { SDKBrowserModule } from './shared/sdk/index';
import { LoopBackConfig, LoggerService } from './shared/sdk';
import { BASE_URL, API_VERSION } from './shared/base.url';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from './material.module';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AngularMaterialModule,
    SDKBrowserModule.forRoot(),
  ],
  declarations: [
    AppComponent
  ],
  providers: [],
  entryComponents: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor(private log: LoggerService) {
    LoopBackConfig.setDebugMode(false); // defaults true
    this.log.info('App is Initilized!!');
    LoopBackConfig.setBaseURL(BASE_URL);
    LoopBackConfig.setApiVersion(API_VERSION);
  }
}
