import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { RoutingPath } from './models/routing.models';
import { dataAttributeKeys } from './shared/general-consts';

const routes: Routes = [
  {
    path: RoutingPath.AUTH,
    canActivate: [AuthGuard],
    loadChildren: () => import('./components/auth/auth.module').then(m => m.AuthModule),
    data: {attributeKey: dataAttributeKeys.LOCAITON, attributeValue: RoutingPath.AUTH}
  },
  {
    path: '',
    redirectTo: RoutingPath.APP,
    pathMatch: 'full'
  },
  {
    path: '',
    canActivateChild: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: RoutingPath.APP,
        pathMatch: 'full'
      },
      {
        path: RoutingPath.APP,
        loadChildren: () => import('./components/home/home.module').then(m => m.HomeModule),
        data: {attributeKey: dataAttributeKeys.LOCAITON, attributeValue: RoutingPath.APP}
      },
    ]
  },
  {path: '**', redirectTo: RoutingPath.APP, pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
