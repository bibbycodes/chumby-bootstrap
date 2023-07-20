import {Controller, Get, Post, Body, Param} from '@nestjs/common';
import {EmailService} from './email.service';
import {ValidationPipe} from "@nestjs/common/pipes/validation.pipe";

@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {
  }

  @Post('register')
  async register(@Body(ValidationPipe) createEmailDto: { email: string }): Promise<void> {
    await this.emailService.create(createEmailDto);
  }

  @Post('deregister')
  async deregister(@Body(ValidationPipe) updateEmailDto: { email: string }): Promise<void> {
    await this.emailService.deregister(updateEmailDto.email);
  }
}
