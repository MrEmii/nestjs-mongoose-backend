import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IFlight } from 'src/ common/interfaces/flight.interface';
import { IPassenger } from 'src/ common/interfaces/passenger.interfaces';
import { FLIGHT } from 'src/ common/models/models';
import { FlightDTO } from './dto/flight.dto';
import axios from 'axios';
import moment from 'moment';
import { ILocation } from 'src/ common/interfaces/location.interface';
import { IWeather } from 'src/ common/interfaces/weather.interface';

@Injectable()
export class FlightService {
  constructor(@InjectModel(FLIGHT.name) private readonly model: Model<IFlight>) { }

  async create(flight: FlightDTO): Promise<IFlight> {
    const newPassenger = new this.model(flight);

    return (await newPassenger.save());
  }

  async findAll(): Promise<IFlight[]> {
    return await this.model.find({}).populate('passengers');
  }

  async findOne(id: string): Promise<IFlight> {
    const flight = await this.model.findById(id).populate('passengers');

    const location: ILocation = await this.getLocation(flight.destination);

    const weather: IWeather[] = await this.getWeather(location.woeid, flight.date);

    return this.assign(flight, weather);
  }

  assign({ _id, pilot, airplain, destination, date, passengers }: IFlight, weather: IWeather[]): IFlight {
    return Object.assign({ _id, pilot, airplain, destination, date, passengers, weather})
  }

  async getWeather(woeid: number, date: Date): Promise<IWeather[]> {

    let year = date.getUTCFullYear();
    let month = date.getUTCMonth();
    let day = date.getUTCDay();
    const { data } = await axios.get<IWeather[]>(`https://www.metaweather.com/api/location/${woeid}/${year}/${month}/${day}`)

    return data;
  }

  async getLocation(destination: string): Promise<ILocation> {
    const { data } = await axios.get<ILocation[]>(`https://www.metaweather.com/api/location/search/?query=${destination}`)

    return data[0];
  }

  async updateOne(id: string, flight: FlightDTO): Promise<IFlight> {
    return await this.model.findByIdAndUpdate(id, flight, { new: true }).populate('passengers')
  }

  async deleteOne(id: string): Promise<IFlight> {
    return await this.model.findByIdAndDelete(id);
  }

  async addPassenger(id: string, passenger: string): Promise<IFlight> {
    return await this.model.findByIdAndUpdate(id, {
      $addToSet: {
        passengers: passenger
      }
    }, { new: true }).populate('passengers')
  }
}
