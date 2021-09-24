import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

// material imports
import { MatMenuModule } from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import { HeaderComponent } from './components/header/header.component';
import {MatIconModule} from '@angular/material/icon';

const classes: any[] = [HeaderComponent];
const sharedModules: any[] = [];
const externalModules: any[] = [
  FormsModule,
  ReactiveFormsModule,
  HttpClientModule,
  CommonModule,
  RouterModule,
  TranslateModule,
  MatMenuModule,
  MatButtonModule,
  MatIconModule
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
