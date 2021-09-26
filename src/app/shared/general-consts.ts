export const localStorageKeys = {
  APP_LANG: 'shugaAppLang$',
  APP_TOKEN: 'shugaToken$',
}

export const dataAttributeKeys = {
  LOCAITON: 'data-location'
}

export enum ePageRefresh {
  READINGS = 1,
  MEALS
}

export enum eDialogComponentType {
  SUGAR_READING = 1,
  MEAL,
  CONFIRMATION
}

export enum eDialogStatus {
  OPEN, // dialog status is open
  DISMISS, // dialog status is closed without taken action => cancel
  CLOSE_OK, // Close with success
  CLOSE_ERROR, // close with an error
}
