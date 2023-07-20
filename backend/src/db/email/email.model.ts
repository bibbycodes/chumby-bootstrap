import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {Email, EmailDocument} from './email.schema';

@Injectable()
export class EmailModel {
  constructor(
    @InjectModel(Email.name) private emailModel: Model<EmailDocument>,
  ) {}

  async create(emailDto: Partial<Email>): Promise<Email> {
    const createdUser = new this.emailModel({...emailDto, active: true});
    return createdUser.save();
  }

  async findAll(): Promise<Email[]> {
    return this.emailModel.find().exec();
  }

  async findOneById(id: string): Promise<Email> {
    return this.emailModel.findById(id).exec();
  }
}
