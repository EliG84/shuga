import { registerLocaleData, Location, LocationStrategy, HashLocationStrategy } from '@angular/common';
import { Inject, Injectable, LOCALE_ID, NgModule } from '@angular/core';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import localeIl from '@angular/common/locales/he';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './core/services/auth.interceptor';
import { SugarReadingDialogComponent } from './components/dialogs/sugar-reading-dialog/sugar-reading-dialog.component';
import { ConfirmationComponent } from './components/dialogs/confirmation/confirmation.component';
import { CreateDayDialogComponent } from './components/dialogs/create-day-dialog/create-day-dialog.component';
import { CreateMealDialogComponent } from './components/dialogs/create-meal-dialog/create-meal-dialog.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { LoaderComponent } from './shared/components/loader/loader.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HammerModule } from '@angular/platform-browser';
import { WaterDialogComponent } from './components/dialogs/water-dialog/water-dialog.component';

registerLocaleData(localeIl);

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}

const classes: any[] = [
  AppComponent,
  SugarReadingDialogComponent,
  ConfirmationComponent,
  CreateDayDialogComponent,
  CreateMealDialogComponent,
  LoaderComponent,
  WaterDialogComponent
]

@NgModule({
  declarations: [...classes],
  imports: [
    BrowserAnimationsModule,
    AppRoutingModule,
    MatProgressSpinnerModule,
    HammerModule,
    SharedModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    Location,
    { provide: LocationStrategy, useClass: HashLocationStrategy},
    { provide: LOCALE_ID, useValue: 'he-IL' },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
