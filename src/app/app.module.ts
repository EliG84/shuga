import { registerLocaleData, Location, LocationStrategy, HashLocationStrategy } from '@angular/common';
import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule, HammerModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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
  LoaderComponent]

@NgModule({
  declarations: [...classes],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HammerModule,
    AppRoutingModule,
    MatProgressSpinnerModule,
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
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
