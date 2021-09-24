import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GraphsRoutingModule } from './graphs-routing.module';
import { GraphsComponent } from './graphs.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [GraphsComponent],
  exports: [GraphsComponent],
  imports: [
    CommonModule,
    GraphsRoutingModule,
    SharedModule,
  ]
})
export class GraphsModule { }
