export interface ISugarReading {
  _id?: string;
  mealId?: string;
  date: Date;
  time: number;
  result: number;
  isMorningReading: boolean;
}
