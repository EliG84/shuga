import { Component, ChangeDetectionStrategy, Input, ChangeDetectorRef, DoCheck, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { first } from 'rxjs/operators';
import { BloodPreasureDialogComponent } from 'src/app/components/dialogs/blood-preasure-dialog/blood-preasure-dialog.component';
import { CreateMealDialogComponent } from 'src/app/components/dialogs/create-meal-dialog/create-meal-dialog.component';
import { WaterDialogComponent } from 'src/app/components/dialogs/water-dialog/water-dialog.component';
import { dialogHeights, eDialogStatus } from 'src/app/shared/general-consts';

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
  @Input()
  bloodPreasureId: string | undefined | null;
  @Input()
  detailedView: boolean | undefined;
  @Input()
  water: number | undefined;
  @Output()
  deleteDayEmmiter = new EventEmitter<string>();

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
      if (res?.status === eDialogStatus.CLOSE_OK && res.mealId) {
        this.meals?.push(res.mealId);
      }
    });
  }

  editWater(): void {
    const dialogRef = this.matDialog.open(WaterDialogComponent,
      {
        data: {
          data: this.water,
          dayId: this.dayId,
          header: 'DIALOGS.MESSAGES.WATER_GLASSES'
        },
        height: dialogHeights.FULL_PERCENT,
        width: dialogHeights.FULL_VH
      });
      dialogRef.afterClosed().pipe(first())
      .subscribe((res: {status: eDialogStatus, amount: number}) => {
          if (res?.status === eDialogStatus.CLOSE_OK) this.water = res.amount;
      });
  }

  editBloodPreasure(): void {
    const dialogRef = this.matDialog.open(BloodPreasureDialogComponent,
      {
        data: {
          data: this.bloodPreasureId,
          date: this.date,
          dayId: this.dayId,
          header: 'DIALOGS.MESSAGES.BLOOD_PREASURE'
        },
        height: dialogHeights.FULL_PERCENT,
        width: dialogHeights.FULL_VH
      });
      dialogRef.afterClosed().pipe(first())
      .subscribe((res: {status: eDialogStatus, bloodPreasureId: string}) => {
          if (res?.status === eDialogStatus.CLOSE_OK) this.bloodPreasureId = res.bloodPreasureId;
      });
  }

  removeMeal(event: string): void {
    this.meals = this.meals?.filter((m) => m !== event);
  }

  deleteDay(): void {
    this.deleteDayEmmiter.emit(this.dayId);
  }

}
