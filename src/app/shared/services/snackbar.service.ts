import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  // TODO
  // add rtl detection

  private closeActionText = 'SNACKBAR.CLOSE';

  constructor(private snackbar: MatSnackBar,
              private tranlsate: TranslateService) { }

  error(message: string): any {
    return this.snackbar.open(this.tranlsate.instant(message),
                              this.tranlsate.instant(this.closeActionText), {
      panelClass: ['snackbar-error'],
      duration: 3000,
      direction: 'rtl',
      verticalPosition: 'top',
    });
  }

  success(message: string): any {
    return this.snackbar.open(this.tranlsate.instant(message),
                              this.tranlsate.instant(this.closeActionText), {
      panelClass: ['snackbar-success'],
      duration: 3000,
      direction: 'rtl',
      verticalPosition: 'top',
    });
  }

  info(message: string): any {
    return this.snackbar.open(this.tranlsate.instant(message),
                              this.tranlsate.instant(this.closeActionText), {
      panelClass: ['snackbar-info'],
      duration: 3000,
      direction: 'rtl',
      verticalPosition: 'top',
    });
  }
}
