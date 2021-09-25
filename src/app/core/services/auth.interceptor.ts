import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { localStorageKeys } from 'src/app/shared/general-consts';
import { catchError } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private localStorage: LocalStorageService,
              private authService: AuthService) {}

  addToken(req: HttpRequest<any>, token: string): HttpRequest<any> {
    return req.clone({ setHeaders: { Authorization: token } });
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): any {
    const token = this.localStorage.getItem(localStorageKeys.APP_TOKEN)?.token;
    return next.handle(this.addToken(request, token || ''))
    .pipe(
      catchError((error) => {
        if (error instanceof HttpErrorResponse) {
          switch (error.status) {
            case 401:
            case 403:
              return this.handle401Error(request, next, error);
            default:
              return throwError(error);
          }
        } else {
          return throwError(error);
        }
      })
    );
  }

  handle401Error(req: HttpRequest<any>, next: HttpHandler, error: HttpErrorResponse): any {
    this.authService.logout();
    return throwError({error, status: 403});
  }
}
