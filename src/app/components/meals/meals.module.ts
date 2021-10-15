import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MealsRoutingModule } from './meals-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { MealsComponent } from './components/meals-all/meals.component';
import { MealComponent } from './components/meal/meal.component';
import { DayComponent } from './components/day/day.component';
import { MealsRouterComponent } from './components/meals-router/meals-router.component';


@NgModule({
  declarations: [MealsComponent, MealComponent, DayComponent, MealsRouterComponent],
  exports: [MealsComponent, MealComponent, DayComponent],
  imports: [
    CommonModule,
    MealsRoutingModule,
    SharedModule,
  ]
})
export class MealsModule { }
