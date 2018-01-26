import {Component} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {getTitle} from './lib/helpers';

@Component({
  selector: 'page-not-found',
  templateUrl: '/templates/404.html'
})
export class PageNotFoundComponent {
  constructor(private titleService: Title) {
    this.titleService.setTitle(getTitle('404 - Страница не найдена'));
  }
}
