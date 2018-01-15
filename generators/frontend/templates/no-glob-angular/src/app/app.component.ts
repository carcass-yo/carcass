import {Location} from '@angular/common';
import {Component} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {Metrika} from 'ng-yandex-metrika';

@Component({
  selector: 'app',
  templateUrl: '/api/ng/app.html'
})
export class AppComponent {
  constructor(
    private metrika: Metrika,
    private router: Router,
    private location: Location
  ) {
    // scroll to top of page
    this.router.events
      .filter((e) => e instanceof NavigationEnd)
      .subscribe(() => {
        if (this.router.url.includes('personal/')) return;
        window.scroll(0, 0);
      });

    // Hit path update to Ya.Metrika
    let prevPath = this.location.path();
    this.router.events
      .filter((e) => e instanceof NavigationEnd)
      .subscribe(() => {
        let newPath = this.location.path();
        if (!newPath) newPath = '/';
        this.metrika.hit(newPath, {referer: prevPath});
        prevPath = newPath;
      });
  }
}
