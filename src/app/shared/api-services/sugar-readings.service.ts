import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/core/services/http.service';
import { SUGAR_READINGS_API } from '../api-paths';
import { ISugarReading } from '../api.models';

@Injectable({
  providedIn: 'root'
})
export class SugarReadingsService {

  constructor(private httpService: HttpService) { }

  getAllReadings(isMorningReadings = false): Observable<ISugarReading[]> {
    return this.httpService.post(`${SUGAR_READINGS_API.BASE}/${SUGAR_READINGS_API.READ_ALL}`,{['isMorningReadings']: isMorningReadings})
  }

  createReading(body: ISugarReading): Observable<ISugarReading> {
    return this.httpService.post(`${SUGAR_READINGS_API.BASE}/${SUGAR_READINGS_API.CREATE}`, body);
  }

  updateReading(body: ISugarReading): Observable<ISugarReading> {
    return this.httpService.put(`${SUGAR_READINGS_API.BASE}/${SUGAR_READINGS_API.UPDATE}/${body._id}`, body);
  }

  deleteReading(id: string): Observable<any> {
    return this.httpService.delete(`${SUGAR_READINGS_API.BASE}/${SUGAR_READINGS_API.DELETE}/${id}`);
  }
}
