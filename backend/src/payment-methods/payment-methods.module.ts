import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PaymentMethodsService } from './payment-methods.service';
import { PaymentMethodsController } from './payment-methods.controller';
import {PaymentMethodSchema} from "../db/payment-method/payment-method.schema";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'PaymentMethod', schema: PaymentMethodSchema }]),
  ],
  controllers: [PaymentMethodsController],
  providers: [PaymentMethodsService],
})
export class PaymentMethodsModule {}
