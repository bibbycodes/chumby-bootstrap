import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export enum PaymentMethodStatus {
  active = 'active',
  deleted = 'deleted',
  blocked = 'blocked',
}

@Schema()
export class PaymentMethod extends Document {
  @Prop ({ required: true })
  userId: string;
  @Prop({ required: true })
  customerId: string;
  @Prop({ required: true })
  paymentMethodId: string;
  @Prop({ required: true })
  tokenId: string;
  @Prop({ required: true })
  last4: string;
  @Prop({ required: true })
  first6: string;
  @Prop({ required: true })
  brand: string;
  @Prop({ required: true })
  stripePaymentMethodId: string;
  @Prop({ required: true })
  status: PaymentMethodStatus;
}

export const PaymentMethodSchema = SchemaFactory.createForClass(PaymentMethod);

export type PaymentMethodDocument = PaymentMethod & Document;
