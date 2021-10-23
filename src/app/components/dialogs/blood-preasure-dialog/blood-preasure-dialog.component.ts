import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { of, Subject } from 'rxjs';
import { first, switchMap, take, takeUntil } from 'rxjs/operators';
import { BloodPreasureService } from 'src/app/shared/api-services/blood-preasure.service';
import { IBloodPreasureResponse } from 'src/app/shared/api.models';
import { eDialogStatus } from 'src/app/shared/general-consts';
import { IDialogPayload } from 'src/app/shared/shared.interfaces';

@Component({
  selector: 'app-blood-preasure-dialog',
  templateUrl: './blood-preasure-dialog.component.html',
  styleUrls: ['./blood-preasure-dialog.component.scss']
})
export class BloodPreasureDialogComponent implements OnInit, OnDestroy {

  destroy$ = new Subject();
  header: string | undefined;
  date: Date | undefined;
  sys: number | undefined;
  dia: number | undefined;
  pul: number | undefined;

  constructor(@Inject(MAT_DIALOG_DATA) public data: IDialogPayload<string | undefined | null>,
              private dialogRef: MatDialogRef<BloodPreasureDialogComponent>,
              private bpSerivce: BloodPreasureService) { }

  ngOnInit(): void {
    this.date = this.data.date;
    this.header= this.data.header;
    of(null).pipe(
      switchMap(() => {
        return this.data.data ? this.bpSerivce.getById(this.data.data) : of(null);
      }),
      takeUntil(this.destroy$)
    ).subscribe((data) => {
      if (data) {
        this.sys = data.sys;
        this.dia = data.dia;
        this.pul = data.pul;
      }
    })
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
  }

  update(): void {
    const request: IBloodPreasureResponse = {
      _id: this.data.data || '',
      dayId: this.data.dayId!,
      date: this.data.date!,
      sys: this.sys!,
      dia: this.dia!,
      pul: this.pul!
    }
    if (!this.data.data) delete request._id;
    of(null).pipe(
      switchMap(() => {
        return this.data.data ? this.bpSerivce.update(request) : this.bpSerivce.create(request);
      }),
      take(1)
    ).subscribe((data) => {
      this.dialogRef.close({bloodPreasureId: data._id,
                            status: eDialogStatus.CLOSE_OK});
    });
  }

  closeDialog(): void {
    this.dialogRef.close({bloodPreasureId: undefined,
                         status: eDialogStatus.DISMISS});
  }

}
