import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { RoutingPath } from './models/routing.models';
import { dataAttributeKeys } from './shared/general-consts';

const routes: Routes = [
  {
    path: RoutingPath.LOGIN,
    canActivate: [AuthGuard],
    loadChildren: () => import('./components/login/login.module').then(m => m.LoginModule),
    data: {attributeKey: dataAttributeKeys.LOCAITON, attributeValue: RoutingPath.LOGIN}
  },
  {
    path: RoutingPath.REGISTER,
    canActivate: [AuthGuard],
    loadChildren: () => import('./components/registration/registration.module').then(m => m.RegistrationModule),
    data: {attributeKey: dataAttributeKeys.LOCAITON, attributeValue: RoutingPath.REGISTER}
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
