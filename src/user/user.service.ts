import { Injectable } from '@nestjs/common';
import { IUser } from 'src/ common/interfaces/user.interface';
import { UserDTO } from './dto/user.dto';
import * as argon2 from "argon2";
import { InjectModel } from '@nestjs/mongoose';
import { USER } from 'src/ common/models/models';
import { Model } from 'mongoose';

@Injectable()
export class UserService {

  constructor(@InjectModel(USER.name) private readonly model: Model<IUser>) { }

  async generatePassword(password: string): Promise<string> {
    let pass = await argon2.hash(password);
    return pass;
  }

  async create(userDTO: UserDTO): Promise<IUser> {
    const password = await this.generatePassword(userDTO.password);
    console.log(password);

    const newUser = new this.model({ ...userDTO, password });

    return (await newUser.save());
  }

  async findAll(): Promise<IUser[]> {
    return await this.model.find({});
  }

  async findOne(id: string): Promise<IUser> {
    return await this.model.findById(id);
  }

  async updateOne(id: string, user: UserDTO): Promise<IUser> {
    const password = await this.generatePassword(user.password);
    console.log(password);

    const newUser = { ...user, password };

    return await this.model.findByIdAndUpdate(id, newUser, { new: true })
  }

  async deleteOne(id: string): Promise<IUser> {
    return await this.model.findByIdAndDelete(id);
  }

  async findByUsername(username: string): Promise<IUser> {
    return await this.model.findOne({ username });
  }

  async checkPassword(password: string, userPassword: string) : Promise<boolean> {
    return await argon2.verify(userPassword, password);
  }
}
