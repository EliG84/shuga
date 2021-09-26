import { eDialogComponentType, eDialogStatus, ePageRefresh } from "./general-consts";

export interface IDialogPayload<T> {
  data?: T;
  source?: ePageRefresh;
  componentType: eDialogComponentType;
  height: string;
  header: string;
}

export interface IDialogResponse {
  source?: ePageRefresh;
  status: eDialogStatus;
}
