import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {PaymentMethod, PaymentMethodDocument} from "../db/payment-method/payment-method.schema";

@Injectable()
export class PaymentMethodsService {
  constructor(
    @InjectModel('PaymentMethod')
    private readonly paymentMethodModel: Model<PaymentMethodDocument>,
  ) {}

  async create(paymentMethodDto: Partial<PaymentMethod>): Promise<PaymentMethod> {
    const createdPaymentMethod = new this.paymentMethodModel(paymentMethodDto);
    return createdPaymentMethod.save();
  }

  async findAll(): Promise<PaymentMethod[]> {
    return this.paymentMethodModel.find().exec();
  }

  async findOneById(id: string): Promise<PaymentMethod> {
    return this.paymentMethodModel.findById(id).exec();
  }
}
