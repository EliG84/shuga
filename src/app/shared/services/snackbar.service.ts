import { Direction } from '@angular/cdk/bidi';
import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { snackBarOptions } from '../general-consts';

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
      panelClass: [snackBarOptions.PANEL_CLASS_ERROR],
      duration: snackBarOptions.DURATION,
      direction: snackBarOptions.DIRECTION_RTL as Direction,
      verticalPosition: snackBarOptions.VERTICAL_POS_TOP as MatSnackBarVerticalPosition,
    });
  }

  success(message: string): any {
    return this.snackbar.open(this.tranlsate.instant(message),
                              this.tranlsate.instant(this.closeActionText), {
      panelClass: [snackBarOptions.PANEL_CLASS_SUCCESS],
      duration: snackBarOptions.DURATION,
      direction: snackBarOptions.DIRECTION_RTL as Direction,
      verticalPosition: snackBarOptions.VERTICAL_POS_TOP as MatSnackBarVerticalPosition,
    });
  }

  info(message: string): any {
    return this.snackbar.open(this.tranlsate.instant(message),
                              this.tranlsate.instant(this.closeActionText), {
      panelClass: [snackBarOptions.PANEL_CLASS_INFOR],
      duration: snackBarOptions.DURATION,
      direction: snackBarOptions.DIRECTION_RTL as Direction,
      verticalPosition: snackBarOptions.VERTICAL_POS_TOP as MatSnackBarVerticalPosition,
    });
  }
}
