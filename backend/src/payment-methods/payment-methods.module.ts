import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PaymentMethodsService } from './payment-methods.service';
import { PaymentMethodsController } from './payment-methods.controller';
import {PaymentMethodSchema} from "../db/payment-method/payment-method.schema";
import {StripeClient} from "../lib/stripe/stripe-client";
import {ConfigModule} from "@nestjs/config";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'PaymentMethod', schema: PaymentMethodSchema }]),
    ConfigModule
  ],
  controllers: [PaymentMethodsController],
  providers: [PaymentMethodsService, StripeClient],
})
export class PaymentMethodsModule {}
