import { IPassenger } from "./passenger.interfaces";
import { IWeather } from "./weather.interface";

export interface IFlight extends Document {
  _id?: any;
  pilot: string;
  airplain: string;
  destination: string;
  date: Date;
  passengers: IPassenger[];
  wheater: IWeather;
}