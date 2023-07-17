import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from "mongoose";
import * as bcrypt from 'bcryptjs';

@Schema()
export class User extends Document {
  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop({ required: true, unique: true, _id: true})
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  phoneNumber: string;

  // @Prop()
  // externalAccounts: {
  //   stripe: {
  //     customerId: string;
  //   }
  // };

  comparePassword(attempt: string): Promise<boolean> {
    return bcrypt.compare(attempt, this['password']);
  }
}

export const UserSchema = SchemaFactory.createForClass(User);
// export const UserSchema = new mongoose.Schema({
//   email: { type: String, unique: true, required: true },
//   password: { type: String, required: true },
// });
//
// UserSchema.pre('save', async function(next: mongoose.NextF) {
//   try {
//     if (!this.isModified('password')) {
//       return next();
//     }
//     const hashed = await bcrypt.hash(this['password'], 10);
//     this['password'] = hashed;
//     return next();
//   } catch (err) {
//     return next(err);
//   }
// });

// UserSchema.methods.comparePassword = function(attempt: string): Promise<boolean> {
//   return bcrypt.compare(attempt, this['password']);
// };

export type UserDocument = User & Document;
