import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  loaderVisible$ = new BehaviorSubject<boolean>(false);
  loadingQue: any[] = []

  constructor() { }

  showLoader(): void {
    if (this.loadingQue.length < 1) {
      this.loaderVisible$.next(true);
    }
    this.loadingQue.push(null);
  }

  hideLoader(): void {
    this.loadingQue.pop();
    if (this.loadingQue.length <= 0) {
      this.loaderVisible$.next(false);
    }
  }
}
