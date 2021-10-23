import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BloodPreasureComponent } from './blood-preasure.component';

const routes: Routes = [
  {path: '', component: BloodPreasureComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BloodPreasureRoutingModule { }
