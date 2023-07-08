import {Module} from '@nestjs/common';
import {PaymentsController} from "./payments.controller";
import {PaymentsService} from "./payments.service";
import {StripeClient} from "../lib/stripe/stripe-client";
import {ConfigModule} from "@nestjs/config";


@Module({
  imports: [ConfigModule],
  controllers: [PaymentsController],
  providers: [
    PaymentsService, 
    StripeClient
  ],
})
export class PaymentsModule {}
