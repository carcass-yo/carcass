<% if (includeAngular) { %>import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {enableProdMode, LOCALE_ID} from '@angular/core';
import localeRu from '@angular/common/locales/ru';
import {registerLocaleData} from '@angular/common';
import {AppModule} from './app/app.module';

if (process.env.ENV === 'production') {
  enableProdMode();
}

registerLocaleData(localeRu);

platformBrowserDynamic().bootstrapModule(AppModule, {
  providers: [{provide: LOCALE_ID, useValue: 'ru'}]
});<% } %>
