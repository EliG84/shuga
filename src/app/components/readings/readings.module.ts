import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReadingsRoutingModule } from './readings-routing.module';
import { ReadingsComponent } from './readings.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [ReadingsComponent],
  exports: [ReadingsComponent],
  imports: [
    CommonModule,
    ReadingsRoutingModule,
    SharedModule
  ]
})
export class ReadingsModule { }
