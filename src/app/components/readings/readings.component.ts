import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { SugarReadingsService } from 'src/app/shared/api-services/sugar-readings.service';
import { ISugarReading } from 'src/app/shared/api.models';

@Component({
  selector: 'app-readings',
  templateUrl: './readings.component.html',
  styleUrls: ['./readings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReadingsComponent implements OnInit {

  // TODO
  // edit + delete from dialog
  // listener for updating content when new reaidng is added from dialog


  readings$ = this.sugarReadingsService.getAllReadings(true).pipe(
    tap(d => console.log(d))
  );


  constructor(private sugarReadingsService: SugarReadingsService) { }

  ngOnInit(): void {

  }

}
