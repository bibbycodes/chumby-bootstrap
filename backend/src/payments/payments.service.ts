import {Injectable} from '@nestjs/common';
import {StripeClient} from "../lib/stripe/stripe-client";
import {CreateChargeRequest} from "./types";
import Stripe from "stripe";

@Injectable()
export class PaymentsService {
  constructor(private readonly stripeClient: StripeClient) {}

  async createPaymentIntent(amount: number, currency: string) {
    return await this.stripeClient.createPaymentIntent(
      amount,
      currency,
    );
  }

  async createCharge(createChargeDto: CreateChargeRequest): Promise<Stripe.Charge> {
    const { amount, currency, customerId, source } = createChargeDto;
    return await this.stripeClient.createCharge(
      currency,
      amount,
      customerId,
      source,
    );
  }
}
