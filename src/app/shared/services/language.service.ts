import { Injectable, OnDestroy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, of, Subject } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';
import { appLanguages, ILanguageConfig } from 'src/app/models/language.models';
import { localStorageKeys } from '../general-consts';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class LanguageService implements OnDestroy {

  private destroy$: Subject<void> = new Subject();
  isRtl$ = new BehaviorSubject<boolean>(false);
  languages$ = new BehaviorSubject<ILanguageConfig[]>(appLanguages);
  private systemLang$ = new BehaviorSubject<ILanguageConfig>(appLanguages[0]);

  constructor(private translateService: TranslateService,
              private localStorageService: LocalStorageService) {
    this.systemLang$.pipe(
      switchMap((lang) => {
        this.localStorageService.setItem(localStorageKeys.APP_LANG,lang);
        this.isRtl = lang.isRtl;
        return this.translateService.use(lang.name);
      }),
      takeUntil(this.destroy$)
    ).subscribe();
   }

   set isRtl(isRtl: boolean) {
     this.isRtl$.next(isRtl);
     document.querySelector('body')?.setAttribute('data-direction', isRtl ? 'rtl' : 'ltr');
   }

   set systemLang(lang: ILanguageConfig) {
     if (lang) this.systemLang$.next(lang);
    }

    get systemLang(): ILanguageConfig {
      return this.systemLang$.value;
    }

  ngOnDestroy(): void {
    this.destroy$.next();
  }
}
