import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { filter, switchMap, takeUntil } from 'rxjs/operators';
import { MealsService } from 'src/app/shared/api-services/meals.service';
import { IMealResponse } from 'src/app/shared/api.models';
import { PageRefreshService } from 'src/app/shared/services/page-refresh.service';

@Component({
  selector: 'app-meal',
  templateUrl: './meal.component.html',
  styleUrls: ['./meal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MealComponent implements OnInit {

  @Input()
  mealId: string | undefined;
  destroy$ = new Subject();
  meal: IMealResponse | undefined;

  constructor(private mealService: MealsService,
              private refreshService: PageRefreshService) { }

  ngOnInit(): void {
    this.refreshService.refreshMeal$
    .pipe(
      filter((value) => value === this.mealId),
      switchMap(() => this.mealService.getMeal(this.mealId!)),
      takeUntil(this.destroy$)
    ).subscribe((meal) =>
    {
      this.meal = meal;
      console.log(meal);
    });
    this.refreshService.refreshMeal$.next(this.mealId);
  }

}
