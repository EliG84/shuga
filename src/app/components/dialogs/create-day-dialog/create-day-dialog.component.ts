import { Component, OnInit, ChangeDetectionStrategy, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DayService } from 'src/app/shared/api-services/day.service';
import { eDialogStatus } from 'src/app/shared/general-consts';
import { IDialogPayload } from 'src/app/shared/shared.interfaces';

@Component({
  selector: 'app-create-day-dialog',
  templateUrl: './create-day-dialog.component.html',
  styleUrls: ['./create-day-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateDayDialogComponent implements OnInit {

  date = new Date();

  constructor(@Inject(MAT_DIALOG_DATA) public data: IDialogPayload<null>,
              private dialogRef: MatDialogRef<CreateDayDialogComponent>,
              private dayApiService: DayService) { }

  ngOnInit(): void {
  }

  save(): void {
    this.dayApiService.create({date: this.date, meals: []})
    .subscribe(() => this.dialogRef.close({
      source: this.data.source,
      status: eDialogStatus.CLOSE_OK
    }));
  }

  closeDialog(): void {
    this.dialogRef.close({source: undefined,
                         status: eDialogStatus.DISMISS});
  }


}
