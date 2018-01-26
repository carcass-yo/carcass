import {Component} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {getTitle} from './lib/helpers';

@Component({
  selector: 'home-page',
  templateUrl: '/templates/home-page.html'
})
export class HomePageComponent {
  constructor(private titleService: Title) {
    this.titleService.setTitle(getTitle('Главная'));
  }
}
