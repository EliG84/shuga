import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { RoutingPath } from 'src/app/models/routing.models';
import { localStorageKeys } from 'src/app/shared/general-consts';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {

  constructor(private localStorage: LocalStorageService,
              private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (route.url[0].path === RoutingPath.AUTH &&
           !!this.localStorage.getItem(localStorageKeys.APP_TOKEN)) {
             return this.router.navigate(['/']);
           }
      document.querySelector('body')?.setAttribute(route.data.attributeKey, route.data.attributeValue);
      return true;
    }
    canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      document.querySelector('body')?.setAttribute(childRoute.data.attributeKey, childRoute.data.attributeValue);
      return !!this.localStorage.getItem(localStorageKeys.APP_TOKEN) || this.router.navigate(['/', RoutingPath.AUTH]);
  }

}
