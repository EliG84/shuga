import { has } from 'lodash';

export class AppResponse<T> {
  data: T;
  constructor(data: any) {
    this.data = has(data, 'data') ? data.data : data;
  }
}

export interface HttpResponseBody<T> {
  data: T;
  summary?: Summary;
  message?: string | null;
  errorCode?: number;
}

export interface Summary {
  skip: number;
  limit: number;
  total: number;
}
