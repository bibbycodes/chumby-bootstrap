import Stripe from 'stripe';
import {ConfigService} from "@nestjs/config";
import {Injectable} from "@nestjs/common";
@Injectable()
export class StripeClient {
  private readonly client: Stripe;
  private readonly apiVersion: Stripe.LatestApiVersion;
  private readonly maxRetries = 3;
  constructor(
    private readonly configService: ConfigService,
  ) {
    const apiKey = this.configService.get<string>('STRIPE_SK_KEY');
    this.client = this.getClient(apiKey);
  }

  getClient = (apiKey: string): Stripe =>
    new Stripe(apiKey, {
      apiVersion: this.apiVersion,
      maxNetworkRetries: this.maxRetries,
    });

  async createCustomer(
    email: string,
    userId: string,
    source?: string,
  ): Promise<Stripe.Response<Stripe.Customer>> {
    return this.client.customers.create({
      email,
      source,
      metadata: {userId: userId.toString()},
    });
  }

  async updateCustomerById(
    customerId: string,
    dataToUpdate: Stripe.CustomerUpdateParams,
  ): Promise<Stripe.Response<Stripe.Customer>> {
    return this.client.customers.update(customerId, dataToUpdate);
  }

  async deleteCustomer(
    email: string,
  ): Promise<Stripe.Response<Stripe.DeletedCustomer>> {
    const [customer] = (await this.client.customers.list({email})).data;
    if (!customer) {
      throw new Error('Customer not found');
    }
    return this.client.customers.del(customer.id);
  }

  async deleteAccount(
    stripeAccountId: string,
  ): Promise<Stripe.Response<Stripe.DeletedAccount>> {
    return this.client.accounts.del(stripeAccountId);
  }

  async getAccountBalance(): Promise<number> {
    const balance = await this.client.balance.retrieve();
    return balance.available[0].amount;
  }

  async createCharge(
    currency: string,
    amount: number,
    customerId: string,
    source?: string,
    metadata?: Stripe.MetadataParam,
  ): Promise<Stripe.Response<Stripe.Charge>> {
    return this.client.charges.create({
      amount,
      currency,
      customer: customerId,
      source,
      metadata,
    });
  }

  async setCardAsDefault(
    accountId: string,
    cardId: string,
  ): Promise<Stripe.Response<Stripe.BankAccount | Stripe.Card>> {
    return this.client.accounts.updateExternalAccount(accountId, cardId, {
      default_for_currency: true,
    });
  }

  async getCustomerById(
    customerId: string,
  ): Promise<Stripe.Response<Stripe.Customer | Stripe.DeletedCustomer> | null> {
    try {
      const customer = await this.client.customers.retrieve(customerId);
      if (customer.deleted) {
        return null;
      }
      return customer;
    } catch (e) {
      if (e.message === 'No such customer') {
        return null;
      }
      throw e;
    }
  }

  async createSourceForCustomer(
    customerId: string,
    source: string,
  ): Promise<Stripe.CustomerSource> {
    return this.client.customers.createSource(customerId, {source});
  }

  async getAccountChargeById(
    id: string,
  ): Promise<Stripe.Response<Stripe.Charge>> {
    return this.client.charges.retrieve(id);
  }

  async createToken(
    card: Stripe.TokenCreateParams.Card,
  ): Promise<Stripe.Response<Stripe.Token>> {
    return this.client.tokens.create({card});
  }

  async retrieveToken(tokenId: string): Promise<Stripe.Response<Stripe.Token>> {
    return this.client.tokens.retrieve(tokenId);
  }

  async createPaymentIntent(
    amount: number,
    currency: string,
    customerId?: string,
    paymentMethodId?: string,
    captureMethod?: Stripe.PaymentIntentCreateParams.CaptureMethod,
    paymentMethodTypes?: string[],
  ): Promise<Stripe.Response<Stripe.PaymentIntent>> {
    return this.client.paymentIntents.create({
      amount,
      currency: currency.toLowerCase(),
      payment_method: paymentMethodId,
      customer: customerId,
      payment_method_types: paymentMethodTypes,
      capture_method: captureMethod,
      confirm: true,
    });
  }

  async cancelPaymentIntent(
    paymentIntentId: string,
  ): Promise<Stripe.Response<Stripe.PaymentIntent>> {
    return this.client.paymentIntents.cancel(paymentIntentId);
  }
}

