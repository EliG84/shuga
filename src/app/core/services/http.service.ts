import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { has } from 'lodash';
import { Observable } from 'rxjs';
import { catchError, map, share } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { HttpResponseBody } from '../models/api.models';
import { AppError } from '../models/error.models';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private baseUrl = '';

  constructor(private httpClient: HttpClient) {
    this.baseUrl = `${environment.BASE_URL}`
   }

   get<T>(url: string, options?: any): Observable<any> {
     const requestOptions = this.createRequestOptions(options, 'GET');
     return this.httpClient.get<HttpResponseBody<T>>(`${this.baseUrl}/${url}`, requestOptions)
     .pipe(
       share(),
       map((e) => this.handleResponse(e as HttpResponse<HttpResponseBody<T>>))
     );
   }

   private createRequestOptions(options: any, method: any): any {
     let headers = options?.headers ? (options.headers) : null;
     let params: HttpParams | null = null;
    switch (method) {
      case 'GET':
      case 'PUT':
        if (!this.headersOfType(headers, 'Content-Type')) {
          headers = new HttpHeaders(headers).set(
            'Content-Type',
            'application/json'
          );
        }
        break;
      case 'DELETE':
      case 'POST':
        headers = new HttpHeaders(headers);
        break;
    }
    if (options?.params) {
      params: new HttpParams();
      Object.keys(options.params).map(key => params = params?.set(key,options.params[key])!);
    }
    const observe: 'response' = 'response';
    return {
      headers,
      params,
      observe
    }
   }
   private headersOfType(headers: HttpHeaders, contentType: string): boolean {
    return headers !== null && headers instanceof HttpHeaders && headers.has(contentType);
   }
   private handleResponse<T>(response: HttpResponse<HttpResponseBody<T>>): any | HttpResponse<HttpResponseBody<T>> {
     if (response?.status < 200 || response?.status >= 400 || response.body?.errorCode) {
       throw (new AppError({status: response?.status, error: `Bad response: ${response}`}));
     }
     return has(response?.body, 'data') ? response.body?.data : response.body;
   }
}
