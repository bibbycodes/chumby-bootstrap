import {Controller, Get, Post, Body, Put, Param} from '@nestjs/common';
import {EmailService} from './email.service';
import {ValidationPipe} from "@nestjs/common/pipes/validation.pipe";

@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {
  }

  @Post()
  async register(@Body(ValidationPipe) createEmailDto: {
    email: string
  }): Promise<void> {
    await this.emailService.create(createEmailDto);
  }

  @Put()
  async update(@Body(ValidationPipe) updateEmailDto: {
    email: string,
    active: boolean
  }): Promise<void> {
    if (!updateEmailDto.active) {
      await this.emailService.deregister(updateEmailDto.email);
    }
  }
}
