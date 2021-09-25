import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthRoutingPath } from 'src/app/models/routing.models';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: AuthRoutingPath.LOGIN,
    pathMatch: 'full',
  },
  {
    path: AuthRoutingPath.LOGIN,
    component: LoginComponent,
  },
  {
    path: AuthRoutingPath.REGISTER,
    component: RegistrationComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
