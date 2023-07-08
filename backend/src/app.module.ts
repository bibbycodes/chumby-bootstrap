import { Module } from '@nestjs/common';
import {ConfigModule, ConfigService} from '@nestjs/config';
import { PaymentsModule } from './payments/payments.module';
import {PaymentsController} from "./payments/payments.controller";
import {PaymentsService} from "./payments/payments.service";
import {User, UserSchema} from "./db/user/user.schema";
import {UsersModule} from "./users/users.module";
import {UsersController} from "./users/users.controller";
import {UserService} from "./users/users.service";
import {MongooseModule} from "@nestjs/mongoose";
import {StripeClient} from "./lib/stripe/stripe-client";
import {PaymentMethodsModule} from "./payment-methods/payment-methods.module";
import {PaymentMethodsService} from "./payment-methods/payment-methods.service";
import {PaymentMethodsController} from "./payment-methods/payment-methods.controller";
import {PaymentMethod, PaymentMethodSchema} from "./db/payment-method/payment-method.schema";

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get('MONGODB_URI'),
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: PaymentMethod.name, schema: PaymentMethodSchema }]),
    PaymentsModule,
    UsersModule,
    PaymentMethodsModule
  ],
  controllers: [PaymentsController, UsersController, PaymentMethodsController],
  providers: [PaymentsService, UserService, StripeClient, PaymentMethodsService]
})
export class AppModule {}
