import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';

export enum subscriptionStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  PENDING = 'pending',
  INVALID = 'invalid',
  UNSUBSCRIBED = 'unsubscribed'
}

@Schema()
export class MailingList extends Document {
  @Prop({ required: true, unique: true, _id: true})
  emailAddress: string;
  
  @Prop()
  token: string;
  
  @Prop()
  status: subscriptionStatus;
}

export const MailingListSchema = SchemaFactory.createForClass(MailingList);
export type MailingListDocument = MailingList & Document;
