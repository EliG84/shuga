import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { first } from 'rxjs/operators';
import { ConfirmationComponent } from 'src/app/components/dialogs/confirmation/confirmation.component';
import { CreateDayDialogComponent } from 'src/app/components/dialogs/create-day-dialog/create-day-dialog.component';
import { CreateMealDialogComponent } from 'src/app/components/dialogs/create-meal-dialog/create-meal-dialog.component';
import { SugarReadingDialogComponent } from 'src/app/components/dialogs/sugar-reading-dialog/sugar-reading-dialog.component';
import { eDialogComponentType, eDialogStatus, ePageRefresh } from '../general-consts';
import { IDialogPayload, IDialogResponse } from '../shared.interfaces';
import { PageRefreshService } from './page-refresh.service';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog: MatDialog,
              private refreshService: PageRefreshService) { }

  openDialog(payload: IDialogPayload<any>): void {
    const dialogRef = this.dialog.open(this.chooseComponent(payload?.componentType),{
      data: payload,
      height: payload?.height,
      width: '100vh',
    });
    dialogRef.afterClosed().pipe(first())
    .subscribe((payload: IDialogResponse) =>{
      if (payload.status === eDialogStatus.CLOSE_OK) {
        this.notifyRefreshService(payload);
      }
    });
  }

  private chooseComponent(type: number): any {
    switch (type) {
      case eDialogComponentType.SUGAR_READING:
       return SugarReadingDialogComponent;
      case eDialogComponentType.CONFIRMATION:
        return ConfirmationComponent;
      case eDialogComponentType.ADD_DAY:
        return CreateDayDialogComponent;
      case eDialogComponentType.ADD_MEAL:
        return CreateMealDialogComponent;
      default:
       return SugarReadingDialogComponent;
    }
  }

  notifyRefreshService(payload: IDialogResponse): void {
    switch (payload.source) {
      case ePageRefresh.READINGS:
      case ePageRefresh.DAYS:
        this.refreshService.refresh$.next(payload.source);
        break;
      case ePageRefresh.MEALS:
        this.refreshService.refreshMeal$.next(payload.mealId);
        break;
      default:
        break;
    }
  }
}
