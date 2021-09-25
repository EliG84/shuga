import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import { AuthService } from 'src/app/core/services/auth.service';
import { ILanguageConfig } from 'src/app/models/language.models';
import { AppRoutingPath, RoutingPath } from 'src/app/models/routing.models';
import { LanguageService } from '../../services/language.service';
import { SugarReadingDialogComponent } from 'src/app/components/dialogs/sugar-reading-dialog/sugar-reading-dialog.component';
import { first } from 'rxjs/operators';
import { SnackbarService } from '../../services/snackbar.service';

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
      name: 'HEADER.NAVIGATION.MORNING_READINGS',
      icon: 'wb_sunny',
      action: () => this.router.navigate(['/', RoutingPath.APP,AppRoutingPath.MORNING_READINGS])
    },
    {
      name: 'HEADER.NAVIGATION.ADD_MORGINING_READING',
      icon: 'add',
      action: () => this.openScackbar()
    },
    {
      name: 'HEADER.NAVIGATION.MEALS_LIST',
      icon: 'list_alt',
      action: () => this.router.navigate(['/', RoutingPath.APP,AppRoutingPath.MEALS])
    },
    {
      name: 'HEADER.NAVIGATION.GRAPH',
      icon: 'timeline',
      action: () => this.router.navigate(['/', RoutingPath.APP,AppRoutingPath.GRAPHS])
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
              private dialog: MatDialog,
              private snackBar: SnackbarService){
    this.translate.setDefaultLang('he');
    this.appLanguages$ = languageService.languages$;
  }

  openScackbar(): void {
    const dialogRef = this.dialog?.open(
      SugarReadingDialogComponent,
      {
       data: null,
       width: '90%',
       height: '50%'
      }
    );
    dialogRef.afterClosed().pipe(first())
    .subscribe((reply: {success: boolean, message: string}) => {
      if (!reply) return;
      if (reply?.success) {
        this.snackBar?.success(reply?.message);
      } else {
        this.snackBar?.error(reply?.message);
      }
    })
  }

}
