import { Injectable } from '@angular/core';
import { isStringJson } from '../utils';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  getItem(key: string): any {
    const data = localStorage.getItem(key);
    return isStringJson(data) ? JSON.parse(data!) : data;
  }

  setItem(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  clearAll(): void {
    localStorage.clear();
  }
}
