import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {MailingList, MailingListDocument} from "../db/email/mailing-list.schema";
import {generateToken} from "./messages.utils";
import {Messenger} from "../lib/messenger/messenger";
import {TemplateGenerator, TemplateGeneratorSelector, Templates} from "../lib/messenger/template-generator";

@Injectable()
export class MessagesService {
  constructor(
    @InjectModel(MailingList.name) private emailModule: Model<MailingListDocument>,
    private messenger: Messenger
  ) {}

  async create(createEmailRequest: Partial<MailingList>): Promise<MailingList> {
    const createdEmail = new this.emailModule(createEmailRequest);
    return createdEmail.save();
  }
  
  async subscribe(emailAddress: string): Promise<string> {
    const token = generateToken()
    const emailContent =  TemplateGenerator.subscriptionVerification(emailAddress, token)
    await this.messenger.sendEmail('info@fumbies.com', emailAddress, 'Verify Your Email!', emailContent)
    await this.emailModule
    return token
  }
  
  async deleteOneByEmail(email: string): Promise<{ ok?: number; n?: number; }> {
    return this.emailModule.deleteOne({ emailAddress: email }).exec() as any;
  }

  async findAll(): Promise<MailingList[]> {
    return this.emailModule.find().exec();
  }

  async findOneById(id: string): Promise<MailingList> {
    return this.emailModule.findById(id).exec();
  }

  async findOneByEmail(email: string): Promise<MailingList> {
    return this.emailModule.findOne({emailAddress: email}).exec();
  }

  async findOneByMail(email: string) {
    return this.emailModule.findOne({emailAddress: email}).exec();
  }

  async deregister(email: string): Promise<MailingList> {
    return this.emailModule.findOneAndUpdate({ emailAddress: email }, { active: false }, { new: true }).exec();
  }
}
