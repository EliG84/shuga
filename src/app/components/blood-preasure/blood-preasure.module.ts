import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BloodPreasureRoutingModule } from './blood-preasure-routing.module';
import { BloodPreasureComponent } from './blood-preasure.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    BloodPreasureComponent
  ],
  imports: [
    CommonModule,
    BloodPreasureRoutingModule,
    SharedModule
  ]
})
export class BloodPreasureModule { }
