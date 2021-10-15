import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy, DoCheck } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { filter, switchMap, takeUntil, tap } from 'rxjs/operators';
import { DayService } from 'src/app/shared/api-services/day.service';
import { IDayResponse } from 'src/app/shared/api.models';
import { eDialogComponentType, ePageRefresh } from 'src/app/shared/general-consts';
import { DialogService } from 'src/app/shared/services/dialog.service';
import { PageRefreshService } from 'src/app/shared/services/page-refresh.service';

@Component({
  selector: 'app-meals',
  templateUrl: './meals.component.html',
  styleUrls: ['./meals.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MealsComponent implements OnInit, OnDestroy, DoCheck {

  destroy$ = new Subject();
  detailedView: boolean | undefined;
  days: IDayResponse[] = [];

  constructor(private dayApiServie: DayService,
              private refreshService: PageRefreshService,
              private cd: ChangeDetectorRef,
              private dialogService: DialogService,
              private activatedRoute: ActivatedRoute) {
                activatedRoute.data.pipe(takeUntil(this.destroy$))
                .subscribe(({detailed}) => {
                  this.detailedView = detailed || false;
                });
              }

  ngOnInit(): void {
    this.refreshService.refresh$
    .pipe(
      filter((source) => source === ePageRefresh.DAYS),
      switchMap(() => this.dayApiServie.getAllDays()),
      takeUntil(this.destroy$)
    ).subscribe((data) => {
      if (Array.isArray(data)) {
        this.days = data;
      }
    });
    this.refreshService.refresh$.next(ePageRefresh.DAYS);
  }

  ngOnDestroy(): void {
    this.destroy$.next()
  }

  ngDoCheck(): void {
    this.cd.markForCheck();
  }

  identify(index: number, item: IDayResponse): string {
    return item._id;
 }

 addDay(): void {
   this.dialogService.openDialog({
     source: ePageRefresh.DAYS,
     componentType: eDialogComponentType.ADD_DAY,
     height: '60vh',
     header: 'DIALOGS.MESSAGES.ADD_DAY'
   })
 }

 deleteDay(id: string): void {
  this.dayApiServie.delete(id)
  .subscribe(() => this.refreshService.refresh$.next(ePageRefresh.DAYS))
 }

}
