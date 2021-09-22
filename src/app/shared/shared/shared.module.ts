import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

const classes: any[] = [];
const sharedModules: any[] = [];
const externalModules: any[] = [
  FormsModule,
  ReactiveFormsModule,
  HttpClientModule,
  CommonModule,
  RouterModule,
  TranslateModule
];


@NgModule({
  declarations: [...classes],
  exports: [...classes,...externalModules,...sharedModules],
  imports: [
    ...sharedModules,
    ...externalModules
  ]
})
export class SharedModule { }
