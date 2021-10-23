import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeRoutingPath } from 'src/app/models/routing.models';
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
        path: HomeRoutingPath.MEALS,
        loadChildren: () => import('../meals/meals.module').then(m => m.MealsModule),
        data: {attributeKey: dataAttributeKeys.LOCAITON, attributeValue: HomeRoutingPath.MEALS}
      },
      {
        path: HomeRoutingPath.MORNING_READINGS,
        loadChildren: () => import ('../readings/readings.module').then(m => m.ReadingsModule),
        data: {attributeKey: dataAttributeKeys.LOCAITON, attributeValue: HomeRoutingPath.MORNING_READINGS, isMorningReading: true}
      },
      {
        path: HomeRoutingPath.ALL_READINGS,
        loadChildren: () => import ('../readings/readings.module').then(m => m.ReadingsModule),
        data: {attributeKey: dataAttributeKeys.LOCAITON, attributeValue: HomeRoutingPath.MORNING_READINGS, isMorningReading: false}
      },
      {
        path: HomeRoutingPath.BLOOD_PREASURE,
        loadChildren: () => import ('../blood-preasure/blood-preasure.module').then(m => m.BloodPreasureModule),
        data: {attributeKey: dataAttributeKeys.LOCAITON, attributeValue: HomeRoutingPath.BLOOD_PREASURE, isMorningReading: false}
      },
      {
        path: HomeRoutingPath.GRAPHS,
        loadChildren: () => import('../graphs/graphs.module').then(m => m.GraphsModule),
        data: {attributeKey: dataAttributeKeys.LOCAITON, attributeValue: HomeRoutingPath.GRAPHS}
      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
