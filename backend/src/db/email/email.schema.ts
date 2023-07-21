import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';

@Schema()
export class Email extends Document {
  @Prop({ required: true, unique: true, _id: true})
  email: string;

  @Prop()
  active: boolean;
}

export const EmailSchema = SchemaFactory.createForClass(Email);
export type EmailDocument = Email & Document;
