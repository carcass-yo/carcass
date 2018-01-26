import {LOCALE_ID, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {HttpClientModule, HttpClientJsonpModule} from '@angular/common/http';
import {TextMaskModule} from 'angular2-text-mask';
import {MetrikaModule} from 'ng-yandex-metrika';
import {CONFIG} from './lib/helpers';

import {AppComponent} from './app.component';
import {HeaderComponent} from './header.component';
import {FooterComponent} from './footer.component';
import {HomePageComponent} from './home-page.component';
import {PageNotFoundComponent} from './page-not-found.component';
import {AppRouterModule} from './app-router.module';

let imports: any[] = [
  CommonModule,
  BrowserModule,
  FormsModule,
  HttpClientModule,
  HttpClientJsonpModule,
  TextMaskModule,
  AppRouterModule
];

if (CONFIG.YA_METRIKA_CONF)
  imports.push(MetrikaModule.forRoot(CONFIG.YA_METRIKA_CONF));

@NgModule({
  imports: imports,
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    PageNotFoundComponent,
    HomePageComponent
  ],
  providers: [
    {provide: LOCALE_ID, useValue: 'ru'}
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {}
