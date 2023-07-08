import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { PaymentMethodsService } from './payment-methods.service';
import {PaymentMethod} from "../db/payment-method/payment-method.schema";

@Controller('payment-methods')
export class PaymentMethodsController {
  constructor(private readonly paymentMethodsService: PaymentMethodsService) {}

  @Get()
  async findAll() {
    return this.paymentMethodsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.paymentMethodsService.findOneById(id);
  }

  @Post()
  async create(@Body() createPaymentMethodRequest: Partial<PaymentMethod>) {
    return this.paymentMethodsService.create(createPaymentMethodRequest);
  }
}
