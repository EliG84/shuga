import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [LoginComponent,RegistrationComponent],
  exports: [LoginComponent, RegistrationComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModule,
  ]
})
export class AuthModule { }
