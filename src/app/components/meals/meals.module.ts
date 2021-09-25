import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MealsRoutingModule } from './meals-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { MealsListComponent } from './components/meals-list/meals-list.component';


@NgModule({
  declarations: [MealsListComponent],
  exports: [MealsListComponent],
  imports: [
    CommonModule,
    MealsRoutingModule,
    SharedModule,
  ]
})
export class MealsModule { }
