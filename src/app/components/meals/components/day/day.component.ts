import { Component, ChangeDetectionStrategy, Input, ChangeDetectorRef, DoCheck } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { first } from 'rxjs/operators';
import { CreateMealDialogComponent } from 'src/app/components/dialogs/create-meal-dialog/create-meal-dialog.component';
import { MealsService } from 'src/app/shared/api-services/meals.service';
import { dialogHeights, eDialogStatus } from 'src/app/shared/general-consts';
import { DialogService } from 'src/app/shared/services/dialog.service';
import { PageRefreshService } from 'src/app/shared/services/page-refresh.service';

@Component({
  selector: 'app-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DayComponent implements DoCheck {

  @Input()
  dayId: string | undefined;
  @Input()
  date: Date | undefined;
  @Input()
  meals: string[] | undefined;

  constructor(private matDialog: MatDialog,
              private ck: ChangeDetectorRef) { }

  ngDoCheck(): void {
    this.ck.markForCheck();
  }

  addMeal(): void {
    const dialogRef = this.matDialog.open(CreateMealDialogComponent,{
      data: {
        data: null,
        dayId: this.dayId,
        date: this.date,
        header: 'DIALOGS.MESSAGES.ADD_MEAL'
      },
      height: dialogHeights.FULL_PERCENT,
      width: dialogHeights.FULL_VH
    });
    dialogRef.afterClosed().pipe(first())
    .subscribe((res: {status: eDialogStatus, mealId?: string}) => {
      if (res.status === eDialogStatus.CLOSE_OK && res.mealId) {
        this.meals?.push(res.mealId);
      }
    })
  }

  removeMeal(event: string): void {
    this.meals = this.meals?.filter((m) => m !== event);
  }

}
