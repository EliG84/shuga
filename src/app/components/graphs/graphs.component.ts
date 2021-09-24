import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-graphs',
  templateUrl: './graphs.component.html',
  styleUrls: ['./graphs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GraphsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
