import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {Email, EmailDocument} from "../db/email/email.schema";

@Injectable()
export class EmailService {
  constructor(
    @InjectModel(Email.name) private emailModule: Model<EmailDocument>
  ) {}

  async create(createEmailRequest: Partial<Email>): Promise<Email> {
    const createdEmail = new this.emailModule(createEmailRequest);
    return createdEmail.save();
  }


  async deleteOneByEmail(email: string): Promise<{ ok?: number; n?: number; }> {
    return this.emailModule.deleteOne({ email }).exec();
  }

  async findAll(): Promise<Email[]> {
    return this.emailModule.find().exec();
  }

  async findOneById(id: string): Promise<Email> {
    return this.emailModule.findById(id).exec();
  }

  async findOneByEmail(email: string): Promise<Email> {
    return this.emailModule.findOne({email}).exec();
  }

  async findOneByMail(email: string) {
    return this.emailModule.findOne({email}).exec();
  }

  async deregister(email: string): Promise<Email> {
    return this.emailModule.findOneAndUpdate({ email }, { active: false }, { new: true }).exec();
  }
}
