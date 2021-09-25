import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { RoutingPath } from 'src/app/models/routing.models';
import { AUTH_API } from 'src/app/shared/api-paths';
import { localStorageKeys } from 'src/app/shared/general-consts';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { ILoginRequest, IRegisterRequest } from '../models/auth.models';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private localStorage: LocalStorageService,
              private httpService: HttpService,
              private router: Router) { }

  login({email, password}: ILoginRequest): void {
    const body = {
      ['email']: email,
      ['password']: password
    }
    this.httpService.post(`${AUTH_API.AUTH}/${AUTH_API.LOGIN}`, body)
    .subscribe((token) => {
      this.localStorage.setItem(localStorageKeys.APP_TOKEN,token);
      this.router.navigate(['/']);
    });
  }

  regitser({email, password, repeat_password}: IRegisterRequest): void {
    const body = {
      ['email']: email,
      ['password']: password,
      ['repeat_password']: repeat_password
    }
    this.httpService.post(`${AUTH_API.AUTH}/${AUTH_API.SINGUP}`, body)
    .subscribe((token) => {
      this.localStorage.setItem(localStorageKeys.APP_TOKEN, token);
      this.router.navigate(['/']);
    })
  }

  logout(): void {
    this.localStorage.clearAll();
    this.router.navigate(['/', RoutingPath.AUTH]);
  }
}
