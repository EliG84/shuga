import { eDialogComponentType, eDialogStatus, ePageRefresh } from "./general-consts";

export interface IDialogPayload<T> {
  data?: T;
  dayId?: string;
  mealId?: string;
  date?: Date;
  source?: ePageRefresh;
  componentType: eDialogComponentType;
  height: string;
  header: string;
}

export interface IDialogResponse {
  source?: ePageRefresh;
  status: eDialogStatus;
  mealId?: string;
  dayId?: string;
}
