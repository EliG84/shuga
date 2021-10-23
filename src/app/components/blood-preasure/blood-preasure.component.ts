import { Component, OnInit, ChangeDetectionStrategy, DoCheck, ChangeDetectorRef } from '@angular/core';
import { BloodPreasureService } from 'src/app/shared/api-services/blood-preasure.service';
import { IBloodPreasureResponse } from 'src/app/shared/api.models';

@Component({
  selector: 'app-blood-preasure',
  templateUrl: './blood-preasure.component.html',
  styleUrls: ['./blood-preasure.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BloodPreasureComponent implements OnInit, DoCheck {

  dataSource: IBloodPreasureResponse[] | undefined;
  displayedColumns = ['date', 'sys', 'dia', 'pul'];

  constructor(private bpService: BloodPreasureService,
              private cd : ChangeDetectorRef) { }

  ngOnInit(): void {
    this.bpService.getAll().subscribe((data) => this.dataSource = data);
  }

  ngDoCheck(): void {
    this.cd.markForCheck();
  }

}
