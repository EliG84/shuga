import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, ChangeDetectorRef, DoCheck } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { filter, first, switchMap, takeUntil, tap } from 'rxjs/operators';
import { SugarReadingsService } from 'src/app/shared/api-services/sugar-readings.service';
import { ISugarReading } from 'src/app/shared/api.models';
import { dialogHeights, eDialogComponentType, ePageRefresh } from 'src/app/shared/general-consts';
import { DialogService } from 'src/app/shared/services/dialog.service';
import { PageRefreshService } from 'src/app/shared/services/page-refresh.service';
import { ConfirmationComponent } from '../dialogs/confirmation/confirmation.component';

@Component({
  selector: 'app-readings',
  templateUrl: './readings.component.html',
  styleUrls: ['./readings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReadingsComponent implements OnInit, OnDestroy, DoCheck {

  destroy$ = new Subject();
  readings$!: Observable<ISugarReading[]>;
  readings: ISugarReading[] = [];


  constructor(private sugarReadingsService: SugarReadingsService,
              private refreshService: PageRefreshService,
              private dialogService: DialogService,
              private cd: ChangeDetectorRef,
              private matDialog: MatDialog,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.refreshService.refresh$
    .pipe(
      filter((source) => source === ePageRefresh.READINGS),
      switchMap(() => this.sugarReadingsService.getAllReadings(this.route?.snapshot?.data?.isMorningReading)),
      takeUntil(this.destroy$)
      ).subscribe((data) => {
        if (Array.isArray(data)) {
          this.readings = data;
        }
      });
    this.refreshService.refresh$.next(ePageRefresh.READINGS);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  ngDoCheck(): void {
    this.cd.markForCheck();
  }

  identify(index: number, item: ISugarReading): number {
    return item.time;
 }

 delete(id: string): void {
  const dialogRef = this.matDialog.open(ConfirmationComponent,{
    data: {
      header:  'DIALOGS.MESSAGES.DELETE'
    },
    height: dialogHeights.FULL_PERCENT,
    width: dialogHeights.FULL_PERCENT,
  });
  dialogRef.afterClosed().pipe(
    first(),
    filter((v) => v),
    switchMap(() => this.sugarReadingsService.deleteReading(id))
    ).subscribe((data) => {
      this.refreshService.refresh$.next(ePageRefresh.READINGS);
    })
 }

 update(data: ISugarReading): void {
    this.dialogService.openDialog({
      data,
      source: ePageRefresh.READINGS,
      componentType: eDialogComponentType.SUGAR_READING,
      height: '60%',
      header: 'DIALOGS.MESSAGES.UPDATE_READING'
    })
 }

}
