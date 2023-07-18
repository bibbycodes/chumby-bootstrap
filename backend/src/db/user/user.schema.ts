import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;
  
  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  phoneNumber: string;

  @Prop({
    type: {
      stripe: {
        customerId: { type: String },
      },
    },
  })
  externalAccounts: { 
    stripe: {
      customerId: string;
    }
  };
}

export const UserSchema = SchemaFactory.createForClass(User);

export type UserDocument = User & Document;
