import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingPath } from 'src/app/models/routing.models';
import { dataAttributeKeys } from 'src/app/shared/general-consts';
import { HomeComponent } from './home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full'
  },
  {
    path: '',
    children: [
      {
        path: AppRoutingPath.MEALS,
        loadChildren: () => import('../meals/meals.module').then(m => m.MealsModule),
        data: {attributeKey: dataAttributeKeys.LOCAITON, attributeValue: AppRoutingPath.MEALS}
      },
      {
        path: AppRoutingPath.MORNING_READINGS,
        loadChildren: () => import ('../readings/readings.module').then(m => m.ReadingsModule),
        data: {attributeKey: dataAttributeKeys.LOCAITON, attributeValue: AppRoutingPath.MORNING_READINGS}
      },
      {
        path: AppRoutingPath.GRAPHS,
        loadChildren: () => import('../graphs/graphs.module').then(m => m.GraphsModule),
        data: {attributeKey: dataAttributeKeys.LOCAITON, attributeValue: AppRoutingPath.GRAPHS}
      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
