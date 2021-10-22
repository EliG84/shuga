import { Injectable } from '@angular/core';
import { result } from 'lodash';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpService } from 'src/app/core/services/http.service';
import { SUGAR_READINGS_API } from '../api-paths';
import { ISugarReading, ISugarReadingTable } from '../api.models';

@Injectable({
  providedIn: 'root'
})
export class SugarReadingsService {

  constructor(private httpService: HttpService) { }

  getAllReadings(isMorningReadings = false): Observable<ISugarReading[] | ISugarReadingTable[]> {
    return this.httpService.post(`${SUGAR_READINGS_API.BASE}/${SUGAR_READINGS_API.READ_ALL}`,{['isMorningReadings']: isMorningReadings})
    .pipe(
      map((readings: ISugarReading[]) => {
        if (!isMorningReadings) {
          const mapping: {
            [dayId: string]: ISugarReadingTable;
          } = readings.reduce(
            (
              res: {[dayId: string]: ISugarReadingTable},
              item: ISugarReading
            ) => {
                const dayId = item.dayId;
                if (dayId && !!res[dayId]) {
                  switch (item?.mealType) {
                    case 1:
                      res[dayId!].morning = item.result;
                      break;
                    case 2:
                      res[dayId!].afterNoon = item.result;
                      break;
                    case 3:
                      res[dayId!].evening = item.result;
                      break;
                    case 4:
                      break;
                    default:
                      res[dayId!].fasting = item.result;
                      break;
                  }
                } else if (dayId && !!!res[dayId]) {
                  const sugarReadingTable: ISugarReadingTable = {
                    date: item.dayDate!,
                    fasting: null,
                    morning: null,
                    afterNoon: null,
                    evening: null
                  }
                  switch (item?.mealType) {
                    case 1:
                      sugarReadingTable.morning = item.result;
                      break;
                    case 2:
                      sugarReadingTable.afterNoon = item.result;
                      break;
                    case 3:
                      sugarReadingTable.evening = item.result;
                    break;
                    case 4:
                      break;
                    default:
                      sugarReadingTable.fasting = item.result;
                      break;
                  }
                  res[dayId!] = sugarReadingTable;
                }
                return res;
          },{})
          const mappedReadings = Object.values(mapping);
          return mappedReadings.sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        }
        return readings;
      })
    )
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
