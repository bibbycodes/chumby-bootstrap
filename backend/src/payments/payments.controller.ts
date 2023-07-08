import {Body, Controller, Get, HttpException, HttpStatus, Post} from '@nestjs/common';
import {PaymentsService} from "./payments.service";
import {CreateChargeRequest} from "./types";

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentService: PaymentsService) {}

  @Post('intent')
  async createPaymentIntent(@Body() { amount, currency }) {
    const paymentIntent = await this.paymentService.createPaymentIntent(
      amount,
      currency,
    );
    return { clientSecret: paymentIntent.client_secret };
  }

  @Post('charge')
  async createCharge(@Body() createChargeRequest: CreateChargeRequest) {
    try {
      const charge = await this.paymentService.createCharge(createChargeRequest);
      return {
        success: true,
        chargeId: charge.id,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
