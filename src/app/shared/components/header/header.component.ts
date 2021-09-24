import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { ILanguageConfig } from 'src/app/models/language.models';
import { AppRoutingPath, MealsRoutingPath, RoutingPath } from 'src/app/models/routing.models';
import { LanguageService } from '../../services/language.service';

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
      route: RoutingPath.APP,
    },
    {
      name: 'HEADER.NAVIGATION.ADD_MEAL',
      icon: 'note_add',
      route: `${RoutingPath.APP}/${MealsRoutingPath.ADD_MEAL}`,
    },
    {
      name: 'HEADER.NAVIGATION.MEALS_LIST',
      icon: 'list_alt',
      route: `${RoutingPath.APP}/${AppRoutingPath.MEALS}`,
    },
    {
      name: 'HEADER.NAVIGATION.GRAPH',
      icon: 'timeline',
      route: `${RoutingPath.APP}/${AppRoutingPath.GRAPHS}`,
    },
  ]

  constructor(public translate: TranslateService,
              public languageService: LanguageService){
    this.translate.setDefaultLang('he');
    this.appLanguages$ = languageService.languages$;
  }

}
