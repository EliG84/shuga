export interface ISugarReading {
  _id?: string;
  mealId?: string;
  date: Date;
  time: number;
  result: number;
  isMorningReading: boolean;
}

export interface IDayResponse {
  _id: string;
  date: Date;
  meals?: string[];
}

export interface IDayRequest {
  date: Date;
  meals: string[];
}

export interface IMealResponse {
  _id: string;
  dayId: string;
  date: Date;
  type: number;
  time: number;
  ingridients: IIngridient[];
  reading: ISugarReading | null;
  image: string;
  name: string;
}

export interface IIngridient {
  name: string;
  unit?: string;
  type: number;
  quantity: number
}

export interface IMealRequest {
  dayId: string;
  type: number;
  date: Date;
  time: number;
  ingridients: IIngridient[];
  reading?: string;
  name?: string;
}
