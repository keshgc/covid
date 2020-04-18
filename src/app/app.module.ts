import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HashLocationStrategy, LocationStrategy } from '@angular/common';

import { HttpClientModule  } from '@angular/common/http';
import { RouterModule } from '@angular/router';


import { ChartModule, HIGHCHARTS_MODULES } from 'angular-highcharts';
import stock from 'highcharts/modules/stock.src';
import more from 'highcharts/highcharts-more.src';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { HomeComponent } from './home/home.component';
import { CountryComponent } from './country/country.component';
import { GlobalDataComponent } from './global-data/global-data.component';
import { GridModule } from '@progress/kendo-angular-grid';
import { KGridComponent } from './k-grid/k-grid.component';
import { LoadingComponent } from './loading/loading.component';


export function highchartsModules() {
  // apply Highcharts Modules to this array
  return [stock, more];
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CountryComponent,
    GlobalDataComponent,
    KGridComponent,
    LoadingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ChartModule,
    RouterModule,
    MatTableModule,
    BrowserAnimationsModule,
    GridModule
  ],
  providers: [
     { provide: HIGHCHARTS_MODULES, useFactory: highchartsModules } ,
     {provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
