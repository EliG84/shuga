import { Component, OnInit, ChangeDetectionStrategy, Input, OnDestroy, DoCheck, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { filter, first, switchMap, takeUntil } from 'rxjs/operators';
import { ConfirmationComponent } from 'src/app/components/dialogs/confirmation/confirmation.component';
import { MealsService } from 'src/app/shared/api-services/meals.service';
import { IMealResponse } from 'src/app/shared/api.models';
import { dialogHeights, eDialogComponentType, eMealTypes, ePageRefresh } from 'src/app/shared/general-consts';
import { DialogService } from 'src/app/shared/services/dialog.service';
import { PageRefreshService } from 'src/app/shared/services/page-refresh.service';

@Component({
  selector: 'app-meal',
  templateUrl: './meal.component.html',
  styleUrls: ['./meal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MealComponent implements OnInit, OnDestroy, DoCheck {

  @Input()
  mealId: string | undefined;
  @Output()
  deleted = new EventEmitter<string>()
  destroy$ = new Subject();
  meal: IMealResponse | undefined;
  date: Date | undefined;
  mealType: string | undefined;

  constructor(private mealService: MealsService,
              private refreshService: PageRefreshService,
              private cd: ChangeDetectorRef,
              private dialogService: DialogService,
              private dialog: MatDialog) { }

  ngOnInit(): void {
    this.refreshService.refreshMeal$
    .pipe(
      filter((value) => value === this.mealId),
      switchMap(() => this.mealService.getMeal(this.mealId!)),
      takeUntil(this.destroy$)
    ).subscribe((meal) =>
      {
        this.meal = meal;
        this.date = new Date(meal.time);
        this.mealType = this.getMealTypeTranslation(meal.type);
      });
    this.refreshService.refreshMeal$.next(this.mealId);
  }

  ngOnDestroy(): void {
    this.destroy$.next()
  }

  ngDoCheck(): void {
    this.cd.markForCheck();
  }

  updateMeal(): void {
    this.dialogService.openDialog({
      data: this.meal,
      date: this.meal?.date,
      source: ePageRefresh.MEALS,
      componentType: eDialogComponentType.ADD_MEAL,
      height: '100%',
      header: 'MEALS.EDIT_MEAL'
    })
  }

  deleteMeal(): void {
    const dialogRef =  this.dialog.open(ConfirmationComponent, {
      data: {
        header: 'DIALOGS.MESSAGES.DELETE'
      },
      height: dialogHeights.FULL_PERCENT,
      width: dialogHeights.FULL_PERCENT
    });
    dialogRef.afterClosed().pipe(
      first(),
      filter((v) => v),
      switchMap(() => this.mealService.deleteMeal({dayId: this.meal?.dayId!},this.meal?._id!))
    ).subscribe(() => {
      this.deleted.emit(this.meal?._id);
    })
  }

  sugarReadingForMeal(): void {
    this.dialogService.openDialog({
      data: this.meal?.reading || null,
      mealId: this.meal?._id,
      date: new Date(this.meal?.time!),
      source: ePageRefresh.MEALS,
      componentType: eDialogComponentType.SUGAR_READING,
      height: dialogHeights.FULL_PERCENT,
      header: this.meal?.reading ? 'DIALOGS.MESSAGES.UPDATE_READING' : 'DIALOGS.MESSAGES.ADD_READING'
    });
  }

  getMealTypeTranslation(type: number): string {
    switch (type) {
      case eMealTypes.BREAKFAST:
        return 'MEALS.TYPES.BREAKFAST';
      case eMealTypes.LAUNCH:
        return 'MEALS.TYPES.LAUNCH';
      case eMealTypes.DINNER:
        return 'MEALS.TYPES.DINNER';
      case eMealTypes.INTERMEDIATE:
        return 'MEALS.TYPES.INTERMEDIATE';
      default:
        return '';
    }
  }

}
