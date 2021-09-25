import { Component, OnInit, ChangeDetectionStrategy, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SugarReadingsService } from 'src/app/shared/api-services/sugar-readings.service';
import { ISugarReading } from 'src/app/shared/api.models';

@Component({
  selector: 'app-sugar-reading-dialog',
  templateUrl: './sugar-reading-dialog.component.html',
  styleUrls: ['./sugar-reading-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SugarReadingDialogComponent implements OnInit {

  date: Date | undefined;
  result: number | undefined;

  constructor(@Inject(MAT_DIALOG_DATA) public data: ISugarReading | null,
              private dialgRef: MatDialogRef<SugarReadingDialogComponent>,
              private sugarReadingService: SugarReadingsService) { }

  ngOnInit(): void {
    if (!this.data) {
      this.date = new Date();
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
      isMorningReading: true

    }
    this.sugarReadingService.createReading(request)
    .subscribe((data) => {
      this.closeDialog({success: true, message: 'DIALOGS.MESSAGES.SUCCESS', data})
    })
  }

  update(): void {}

  closeDialog(payload?: {success: boolean, message: string, data: ISugarReading}): void {
    this.dialgRef.close(payload);
  }

}
