import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PASSENGER } from 'src/ common/models/models';
import { PassengerDTO } from './dto/passenger.dto';
import { IPassenger } from '../ common/interfaces/passenger.interfaces';

@Injectable()
export class PassengerService {
  constructor(@InjectModel(PASSENGER.name) private readonly model: Model<IPassenger>) { }

  async create(passenger: PassengerDTO): Promise<IPassenger> {
    const newPassenger = new this.model(passenger);

    return (await newPassenger.save());
  }

  async findAll(): Promise<IPassenger[]> {
    return await this.model.find({});
  }

  async findOne(id: string): Promise<IPassenger> {
    return await this.model.findById(id);
  }

  async updateOne(id: string, passenger: PassengerDTO): Promise<IPassenger> {
    return await this.model.findByIdAndUpdate(id, passenger, { new: true })
  }

  async deleteOne(id: string): Promise<IPassenger> {
    return await this.model.findByIdAndDelete(id);
  }
}
