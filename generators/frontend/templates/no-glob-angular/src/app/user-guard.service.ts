import {Injectable} from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  NavigationExtras,
  Router,
  RouterStateSnapshot
} from '@angular/router';
import {UserService} from './user.service';

@Injectable()
export class UserGuardService implements CanActivate, CanActivateChild {
  constructor(private userService: UserService, private router: Router) {}

  public checkPermissions(state: RouterStateSnapshot) {
    // check for user
    if (!this.userService.user) {
      let redirectUrl = '/';
      let redirectExtras: NavigationExtras = {};
      if (state.url.startsWith('/personal')) {
        redirectUrl = '/signin';
        redirectExtras.queryParams = {from: state.url};
      }

      this.router.navigate([redirectUrl], redirectExtras);
      return false;
    }

    // check for partner permissions
    if ((state.url.includes('edit-company') || state.url.includes('soft')) &&
      !this.userService.user.isPartner) {
      this.router.navigate(['/personal']);
      return false;
    }

    return true;
  }

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    if (this.userService.getCurrentPromise)
      return this.userService.getCurrentPromise.then(() => {
        return this.checkPermissions(state);
      }).catch(() => {
        return this.checkPermissions(state);
      });

    return new Promise((resolve) => resolve(this.checkPermissions(state)));
  }

  public canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    return this.canActivate(route, state);
  }
}
