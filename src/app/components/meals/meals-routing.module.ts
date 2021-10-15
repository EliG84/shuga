import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MealsRouterComponent } from './components/meals-router/meals-router.component';
import { MealsComponent } from './components/meals-all/meals.component';

const routes: Routes = [
  {
    path: '',
    component: MealsRouterComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: MealsComponent,
        data: {detailed: false}
      },
      {
        path: 'detailed',
        component: MealsComponent,
        data: {detailed: true}
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MealsRoutingModule { }
