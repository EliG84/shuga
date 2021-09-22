const DEFAULT_APP_ERROR_TYPE = 9999;
const AppErrorsTranslationMapping: {[key: number]: string} = { // todo add to i18n json file
  9999: 'ERROR_DEFAULT',
  401: 'ERRORS.ERROR_NOT_AUTHORIZED',
  409: 'ERRORS.USERNAME_PASSWORD_ALREADY_EXISTS',
  500: 'ERRORS.ERROR_GENERAL'
}

export interface IAppErrorPayload {
  status: number;
  error: string;
}

export interface IAppError {
  status: number;
  value: string;
  translationKey: string;
}

export class AppError implements IAppError {
  value: string;
  translationKey: string;
  status: number;
  constructor({status = DEFAULT_APP_ERROR_TYPE, error}: IAppErrorPayload) {
    this.status = status;
    this.value = error;
    this.translationKey = !!AppErrorsTranslationMapping[status] ?
                            AppErrorsTranslationMapping[status] :
                            AppErrorsTranslationMapping[DEFAULT_APP_ERROR_TYPE];
  }
}
