import { Module } from '@nestjs/common';
import {ConfigModule, ConfigService} from '@nestjs/config';
import { PaymentsModule } from './payments/payments.module';
import {PaymentsController} from "./payments/payments.controller";
import {PaymentsService} from "./payments/payments.service";

let MongooseModule;

@Module({
  imports: [
    ConfigModule.forRoot(),
    PaymentsModule,
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get('MONGODB_URI'),
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [PaymentsController],
  providers: [PaymentsService]
})
export class AppModule {}
