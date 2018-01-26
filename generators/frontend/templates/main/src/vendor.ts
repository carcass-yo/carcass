<% if (includeAngular) { %>// Angular
import '@angular/platform-browser';
import '@angular/platform-browser-dynamic';
import '@angular/core';
import '@angular/common';
import '@angular/router';
import '@angular/forms';

// RxJS
import 'rxjs';
<% } %>

// Other vendors for example jQuery, Lodash or Bootstrap
// You can import js, ts, css, sass, ...
import './styles/style.less';
import './app/lib/jquery';
import './app/lib/uikit';<% if (includeAngular) { %>
import 'ng-yandex-metrika';
import 'angular2-text-mask';<% } %>
