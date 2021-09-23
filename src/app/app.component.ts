import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { ILanguageConfig } from './models/language.models';
import { LanguageService } from './shared/services/language.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'shuga';
  appLanguages$!: Observable<ILanguageConfig[]>;

  constructor(public translate: TranslateService,
              public languageService: LanguageService){
    this.translate.setDefaultLang('he');
    this.appLanguages$ = languageService.languages$;
  }
}
