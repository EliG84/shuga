import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SugarReadingsService } from 'src/app/shared/api-services/sugar-readings.service';
import { ISugarReading } from 'src/app/shared/api.models';
import { eDialogStatus, ePageRefresh } from 'src/app/shared/general-consts';
import { IDialogPayload, IDialogResponse } from 'src/app/shared/shared.interfaces';

@Component({
  selector: 'app-sugar-reading-dialog',
  templateUrl: './sugar-reading-dialog.component.html',
  styleUrls: ['./sugar-reading-dialog.component.scss'],
})
export class SugarReadingDialogComponent implements OnInit {

  date: Date | undefined;
  result: number | undefined;
  header: string | undefined

  constructor(@Inject(MAT_DIALOG_DATA) public data: IDialogPayload<ISugarReading | null> | null,
              private dialgRef: MatDialogRef<SugarReadingDialogComponent>,
              private sugarReadingService: SugarReadingsService) { }

  ngOnInit(): void {
    this.header = this.data?.header;
    if (!this.data?.data) {
      if (this.data?.date) {
        this.date = new Date(this.data.date);
      } else {
        this.date = new Date();
      }
    } else {
      this.date = new Date(this.data.data.time);
      this.result = this.data?.data?.result || 0;
    }
  }

  create(): void {
    const hours = this.date?.getHours();
    const minutes = this.date?.getMinutes();
    const time = this.date?.setHours(hours!,minutes,0,0);
    const request = {
      date: this.date!,
      mealId: this.data?.data?.mealId || this.data?.mealId,
      time: time!,
      result: this.result!,
      isMorningReading: !this.data?.source || this.data?.source === ePageRefresh.READINGS ? true : false

    }
    if (!request.mealId) delete request.mealId;
    this.sugarReadingService.createReading(request)
    .subscribe(() => {
      if (this.data?.mealId) {
        this.dialgRef.close({
          source: this.data?.source,
          mealId: this.data.mealId,
          status: eDialogStatus.CLOSE_OK,
        } as IDialogResponse)
      } else {
        this.dialgRef.close({source: this.data?.source,
                             status: eDialogStatus.CLOSE_OK});
      }
    })
  }

  update(): void {
    const hours = this.date!.getHours();
    const minutes = this.date!.getMinutes();
    const time = this.date!.setHours(hours!,minutes,0,0);
    this.data!.data!.time = time!;
    this.data!.data!.date = this.date!;
    this.data!.data!.result = this.result!;
    if (this.data?.data?.isMorningReading) {
      delete this.data.data.mealId;
    }
    this.sugarReadingService.updateReading(this.data!.data!)
    .subscribe(() => {
      if (this.data?.source === ePageRefresh.MEALS) {
        this.dialgRef.close({
          source: this.data.source,
          mealId: this.data.data?.mealId,
          status: eDialogStatus.CLOSE_OK
        } as IDialogResponse);
      } else {
        this.dialgRef.close({source: this.data?.source,
                             status: eDialogStatus.CLOSE_OK});
      }
    })
  }

  closeDialog(): void {
    this.dialgRef.close({source: undefined,
                         status: eDialogStatus.DISMISS});
  }

}
