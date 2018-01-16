import {LOCALE_ID, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {HttpModule, JsonpModule} from '@angular/http';
import {RouterModule, Routes} from '@angular/router';
import {TextMaskModule} from 'angular2-text-mask';
import {MetrikaModule} from 'ng-yandex-metrika';
import {CONFIG} from './lib/helpers';

import {AppComponent} from './app.component';
import {HeaderComponent} from './header.component';
import {FooterComponent} from './footer.component';

let imports = [
  CommonModule,
  BrowserModule,
  FormsModule,
  HttpModule,
  JsonpModule,
  TextMaskModule,
  RouterModule.forRoot(appRoutes, {enableTracing: (process.env.ENV !== 'production')})
];

if (CONFIG.YA_METRIKA_CONF)
  imports.push(MetrikaModule.forRoot(CONFIG.YA_METRIKA_CONF));

@NgModule({
  imports: imports,
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent
  ],
  providers: [
    {provide: LOCALE_ID, useValue: 'ru-RU'}
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {}
