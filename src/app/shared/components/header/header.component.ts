import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { ILanguageConfig } from 'src/app/models/language.models';
import { HomeRoutingPath, MealsRoutingPath, RoutingPath } from 'src/app/models/routing.models';
import { LanguageService } from '../../services/language.service';
import { SugarReadingDialogComponent } from 'src/app/components/dialogs/sugar-reading-dialog/sugar-reading-dialog.component';
import { first } from 'rxjs/operators';
import { DialogService } from '../../services/dialog.service';
import { dialogHeights, eDialogComponentType, ePageRefresh } from '../../general-consts';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
  appLanguages$!: Observable<ILanguageConfig[]>;

  navigationItems = [
    {
      name: 'HEADER.NAVIGATION.HOME',
      icon: 'home',
      action: () => this.router.navigate(['/', RoutingPath.APP])
    },
    {
      name: 'HEADER.NAVIGATION.MEALS_ADD',
      icon: 'list_alt',
      action: () => this.router.navigate(['/', RoutingPath.APP,HomeRoutingPath.MEALS])
    },
    {
      name: 'HEADER.NAVIGATION.MEALS_LIST',
      icon: 'list_alt',
      action: () => this.router.navigate(['/', RoutingPath.APP,HomeRoutingPath.MEALS,MealsRoutingPath.DETAILED])
    },
    {
      name: 'HEADER.NAVIGATION.ADD_MORGINING_READING',
      icon: 'add',
      action: () => this.openScackbar()
    },
    {
      name: 'HEADER.NAVIGATION.MORNING_READINGS',
      icon: 'wb_sunny',
      action: () => this.router.navigate(['/', RoutingPath.APP,HomeRoutingPath.MORNING_READINGS])
    },
    {
      name: 'HEADER.NAVIGATION.ALL_READINGS',
      icon: ' list_alt',
      action: () => this.router.navigate(['/', RoutingPath.APP,HomeRoutingPath.ALL_READINGS])
    },
    {
      name: 'HEADER.NAVIGATION.BLOOD_PREASURE',
      icon: 'timeline',
      action: () => this.router.navigate(['/', RoutingPath.APP,HomeRoutingPath.BLOOD_PREASURE])
    },
    {
      name: 'HEADER.NAVIGATION.GRAPH',
      icon: 'timeline',
      action: () => this.router.navigate(['/', RoutingPath.APP,HomeRoutingPath.GRAPHS])
    },
    {
      name: 'HEADER.NAVIGATION.LOGOUT',
      icon: 'exit_to_app',
      action: () => this.authService.logout()
    },
  ]

  constructor(public translate: TranslateService,
              public languageService: LanguageService,
              private router: Router,
              private authService: AuthService,
              private dialogService: DialogService
              ){
    this.translate.setDefaultLang('he');
    this.appLanguages$ = languageService.languages$;
  }

  openScackbar(): void {
    this.dialogService.openDialog({
      data: null,
      componentType: eDialogComponentType.SUGAR_READING,
      header: 'DIALOGS.MESSAGES.ADD_READING',
      source: ePageRefresh.READINGS,
      height: dialogHeights.FULL_PERCENT,
    });
  }

}
