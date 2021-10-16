import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IDialogPayload } from 'src/app/shared/shared.interfaces';
import { eDialogStatus } from 'src/app/shared/general-consts';
import { DayService } from 'src/app/shared/api-services/day.service';

@Component({
  selector: 'app-water-dialog',
  templateUrl: './water-dialog.component.html',
  styleUrls: ['./water-dialog.component.scss'],
})
export class WaterDialogComponent implements OnInit {

  amount: number | undefined;
  header: string | undefined;

  constructor(@Inject(MAT_DIALOG_DATA) public data: IDialogPayload<number>,
              private dialogRef: MatDialogRef<WaterDialogComponent>,
              private dayService: DayService) { }

  ngOnInit(): void {
    this.header = this.data.header;
    this.amount = this.data.data;
  }

  update(): void {
    if (this.amount! >= 0 && this.amount! <= 50) {
      this.dayService.updateWater(this.data.dayId!, this.amount!)
      .subscribe((day) => {
        this.dialogRef.close({amount: this.amount, status: eDialogStatus.CLOSE_OK});
      });
    }
  }

  closeDialog(): void {
    this.dialogRef.close({amount: undefined,
                         status: eDialogStatus.DISMISS});
  }

}
