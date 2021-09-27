import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { first } from 'rxjs/operators';
import { ConfirmationComponent } from 'src/app/components/dialogs/confirmation/confirmation.component';
import { CreateDayDialogComponent } from 'src/app/components/dialogs/create-day-dialog/create-day-dialog.component';
import { SugarReadingDialogComponent } from 'src/app/components/dialogs/sugar-reading-dialog/sugar-reading-dialog.component';
import { eDialogComponentType, eDialogStatus } from '../general-consts';
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
      width: '100%'
    });
    dialogRef.afterClosed().pipe(first())
    .subscribe((payload: IDialogResponse) =>{
      if (payload.status === eDialogStatus.CLOSE_OK) {
        this.notifyRefreshService(payload?.source);
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
      default:
       return SugarReadingDialogComponent;
    }
  }

  notifyRefreshService(source?: number): void {
    this.refreshService.refresh$.next(source);
  }
}
