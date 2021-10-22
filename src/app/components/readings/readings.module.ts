import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReadingsRoutingModule } from './readings-routing.module';
import { ReadingsComponent } from './readings.component';
import { SharedModule } from 'src/app/shared/shared.module';
import {MatTableModule} from '@angular/material/table';


@NgModule({
  declarations: [ReadingsComponent],
  exports: [ReadingsComponent],
  imports: [
    CommonModule,
    ReadingsRoutingModule,
    MatTableModule,
    SharedModule
  ]
})
export class ReadingsModule { }
