import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/core/services/http.service';
import { MEAL_API } from '../api-paths';
import { IMealDeleteRequest, IMealRequest, IMealResponse } from '../api.models';

@Injectable({
  providedIn: 'root'
})
export class MealsService {

  constructor(private httpService: HttpService) { }

  getMeal(id: string): Observable<IMealResponse> {
    return this.httpService.get(`${MEAL_API.BASE}/${MEAL_API.READ_ONE}/${id}`);
  }

  createMeal(body: IMealRequest): Observable<IMealResponse> {
    return this.httpService.post(`${MEAL_API.BASE}/${MEAL_API.CREATE}`, body);
  }

  updateMeal(body: IMealRequest, id: string): Observable<IMealResponse> {
    return this.httpService.put(`${MEAL_API.BASE}/${MEAL_API.UPDATE}/${id}`, body);
  }

  deleteMeal(body: IMealDeleteRequest, id: string): Observable<any> {
    return this.httpService.post(`${MEAL_API.BASE}/${MEAL_API.DELETE}/${id}`, body);
  }

  uploadImage(image: FormData, id: string): Observable<string> {
    return this.httpService.post(`${MEAL_API.BASE}/${MEAL_API.UPLOAD_IMAGE}/${id}`, image);
  }


}
