import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/core/services/http.service';
import { PREASURE_API } from '../api-paths';
import { IBloodPreasureResponse } from '../api.models';

@Injectable({
  providedIn: 'root'
})
export class BloodPreasureService {

  constructor(private httpService: HttpService) { }

  getAll(): Observable<IBloodPreasureResponse[]> {
    return this.httpService.get(`${PREASURE_API.BASE}/${PREASURE_API.READ_ALL}`);
  }

  getById(id: string): Observable<IBloodPreasureResponse> {
    return this.httpService.get(`${PREASURE_API.BASE}/${PREASURE_API.GET_SINGLE}/${id}`);
  }

  create(body: IBloodPreasureResponse): Observable<IBloodPreasureResponse> {
    return this.httpService.post(`${PREASURE_API.BASE}/${PREASURE_API.CREATE}`, body);
  }

  update(body: IBloodPreasureResponse): Observable<IBloodPreasureResponse> {
    return this.httpService.put(`${PREASURE_API.BASE}/${PREASURE_API.UPDATE}/${body._id}`, body);
  }
}
