import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/core/services/http.service';
import { DAY_API } from '../api-paths';
import { IDayRequest, IDayResponse } from '../api.models';

@Injectable({
  providedIn: 'root'
})
export class DayService {

  constructor(private httpService: HttpService) { }

  getAllDays(): Observable<IDayResponse[]> {
    return this.httpService.get(`${DAY_API.BASE}/${DAY_API.READ_ALL}`);
  }

  create(body: IDayRequest): Observable<IDayResponse> {
    return this.httpService.post(`${DAY_API.BASE}/${DAY_API.CREATE}`, body);
  }

  updateWater(dayId: string, amount: number): Observable<IDayResponse> {
    return this.httpService.put(`${DAY_API.BASE}/${DAY_API.WATER}/${dayId}/${amount}`, {});
  }

  delete(id: string): Observable<any> {
    return this.httpService.post(`${DAY_API.BASE}/${DAY_API.DELETE}/${id}`, {});
  }
}
