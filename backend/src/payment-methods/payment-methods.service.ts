import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {PaymentMethod, PaymentMethodDocument} from "../db/payment-method/payment-method.schema";
import {StripeClient} from "../lib/stripe/stripe-client";

@Injectable()
export class PaymentMethodsService {
  constructor(
    @InjectModel('PaymentMethod')
    private readonly paymentMethodModel: Model<PaymentMethodDocument>,
    private readonly stripeClient: StripeClient,
  ) {}

  async create(createPaymentMethodRequest: Partial<PaymentMethod>): Promise<PaymentMethod> {
    const createdPaymentMethod = new this.paymentMethodModel(createPaymentMethodRequest);
    return createdPaymentMethod.save();
  }

  async findAll(): Promise<PaymentMethod[]> {
    return this.paymentMethodModel.find().exec();
  }

  async findOneById(id: string): Promise<PaymentMethod> {
    return this.paymentMethodModel.findById(id).exec();
  }
}
