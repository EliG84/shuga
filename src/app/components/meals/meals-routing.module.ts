import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MealsRoutingPath } from 'src/app/models/routing.models';
import { MealsListComponent } from './components/meals-list/meals-list.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: MealsRoutingPath.MEALS_LIST,
    pathMatch: 'full',
  },
  {
    path: MealsRoutingPath.MEALS_LIST,
    component: MealsListComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MealsRoutingModule { }
