import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {MailingList, MailingListDocument} from './mailing-list.schema';

@Injectable()
export class MailingListModel {
  constructor(
    @InjectModel(MailingListModel.name) private mailingListModel: Model<MailingListDocument>,
  ) {}

  async create(mailingList: Partial<MailingListModel>): Promise<MailingList> {
    const record = new this.mailingListModel({...mailingList, active: true});
    return record.save();
  }

  async findAll(): Promise<MailingList[]> {
    return this.mailingListModel.find().exec();
  }

  async findOneById(id: string): Promise<MailingList> {
    return this.mailingListModel.findById(id).exec();
  }
}
