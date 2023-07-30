import {Module} from '@nestjs/common';
import {ConfigModule, ConfigService} from '@nestjs/config';
import {PaymentsModule} from './payments/payments.module';
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
import {GenerationsController} from "./generations/generations.controller";
import {GenerationsModule} from "./generations/generations.module";
import {GenerationsService} from "./generations/generations.service";
import {StabilityClient} from "./lib/image_generation/stability/stability-client";
import {S3Wrapper} from "./lib/aws/s3-wrapper";
import {ImageSchema, Image} from "./db/image/image.schema";
import {MessagesModule} from "./messages/messages.module";

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get('MONGODB_URI'),
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forFeature([{name: User.name, schema: UserSchema}]),
    MongooseModule.forFeature([{name: PaymentMethod.name, schema: PaymentMethodSchema}]),
    MongooseModule.forFeature([{name: Image.name, schema: ImageSchema}]),
    PaymentsModule,
    UsersModule,
    MessagesModule,
    PaymentMethodsModule,
    GenerationsModule,
  ],
  controllers: [PaymentsController, UsersController, PaymentMethodsController, GenerationsController],
  providers: [PaymentsService, UserService,  StripeClient, PaymentMethodsService, GenerationsService, StabilityClient, S3Wrapper]
})
export class AppModule {
}
