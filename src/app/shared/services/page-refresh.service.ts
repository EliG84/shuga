import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PageRefreshService {

  refresh$ = new Subject<number>();
  refreshMeal$ = new Subject<string>();
  refreshDay$ = new Subject<string>();

  constructor() { }
}
