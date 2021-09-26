import { Component, OnInit, ChangeDetectionStrategy, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SugarReadingsService } from 'src/app/shared/api-services/sugar-readings.service';
import { ISugarReading } from 'src/app/shared/api.models';
import { eDialogStatus, ePageRefresh } from 'src/app/shared/general-consts';
import { IDialogPayload } from 'src/app/shared/shared.interfaces';

@Component({
  selector: 'app-sugar-reading-dialog',
  templateUrl: './sugar-reading-dialog.component.html',
  styleUrls: ['./sugar-reading-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SugarReadingDialogComponent implements OnInit {

  date: Date | undefined;
  result: number | undefined;

  constructor(@Inject(MAT_DIALOG_DATA) public data: IDialogPayload<ISugarReading | null> | null,
              private dialgRef: MatDialogRef<SugarReadingDialogComponent>,
              private sugarReadingService: SugarReadingsService) { }

  ngOnInit(): void {
    if (!this.data?.data) {
      this.date = new Date();
    } else {
      this.date = new Date(this.data.data.time);
      this.result = this.data?.data?.result;
    }
  }

  create(): void {
    const hours = this.date?.getHours();
    const minutes = this.date?.getMinutes();
    const time = this.date?.setHours(hours!,minutes,0,0);
    const request = {
      date: this.date!,
      time: time!,
      result: this.result!,
      isMorningReading: !this.data?.source || this.data?.source === ePageRefresh.READINGS ? true : false

    }
    this.sugarReadingService.createReading(request)
    .subscribe(() => {
      this.dialgRef.close({source: this.data?.source,
                           status: eDialogStatus.CLOSE_OK});
    })
  }

  update(): void {
    const hours = this.date!.getHours();
    const minutes = this.date!.getMinutes();
    const time = this.date!.setHours(hours!,minutes,0,0);
    this.data!.data!.time = time!;
    this.data!.data!.date = this.date!;
    if (this.data?.data?.isMorningReading) {
      delete this.data.data.mealId;
    }
    this.sugarReadingService.updateReading(this.data!.data!)
    .subscribe(() => {
      this.dialgRef.close({source: this.data?.source,
                           status: eDialogStatus.CLOSE_OK})
    })
  }

  closeDialog(): void {
    this.dialgRef.close({source: undefined,
                         status: eDialogStatus.DISMISS});
  }

}
