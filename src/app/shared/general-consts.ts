export const localStorageKeys = {
  APP_LANG: 'shugaAppLang$',
  APP_TOKEN: 'shugaToken$',
}

export const dataAttributeKeys = {
  LOCAITON: 'data-location'
}

export enum ePageRefresh {
  READINGS = 1,
  DAYS,
  MEALS
}

export enum eDialogComponentType {
  SUGAR_READING = 1,
  MEAL,
  CONFIRMATION,
  ADD_DAY,
  ADD_MEAL
}

export enum eDialogStatus {
  OPEN, // dialog status is open
  DISMISS, // dialog status is closed without taken action => cancel
  CLOSE_OK, // Close with success
  CLOSE_ERROR, // close with an error
}

export const dialogHeights = {
  SUGAR_READING: '50%',
  FULL_PERCENT: '100%',
  FULL_VH: '100vh',
  HALF_PERCENT: '50%'
}

export enum eMealTypes {
  BREAKFAST = 1,
  LAUNCH,
  DINNER,
  INTERMEDIATE
}


export const snackBarOptions = {
  PANEL_CLASS_SUCCESS: 'snackbar-info',
  PANEL_CLASS_INFOR: 'snackbar-info',
  PANEL_CLASS_ERROR: 'snackbar-error',
  DURATION: 5000,
  DIRECTION_RTL: 'rtl',
  DIRECTION_LTR: 'ltr',
  VERTICAL_POS_TOP: 'top',
  VERTICAL_POS_BOTTOM: 'bottom',
  HORIZONTAL_POS_START: 'start',
  HORIZONTAL_POS_CENTER: 'center',
  HORIZONTAL_POS_END: 'end',
  HORIZONTAL_POS_LEFT: 'left',
}
