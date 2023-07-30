import {Controller, Get, Post, Body, Put, Param} from '@nestjs/common';
import {MessagesService} from './messages.service';
import {ValidationPipe} from "@nestjs/common/pipes/validation.pipe";

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {
  }

  // @Post('email')
  // async register(@Body(ValidationPipe) createEmailDto: {
  //   email: string
  // }): Promise<void> {
  //   const {email} = createEmailDto
  //   await this.messagesService.create(email);
  // }
  //
  @Post('email/subscribe')
  async subscribe(@Body(ValidationPipe) subscribeRequestParams: {
    email: string
  }): Promise<void> {
    const {email} = subscribeRequestParams
    await this.messagesService.subscribe(email);
  }

  // @Put()
  // async update(@Body(ValidationPipe) updateEmailDto: {
  //   email: string,
  //   active: boolean
  // }): Promise<void> {
  //   if (!updateEmailDto.active) {
  //     await this.messagesService.deregister(updateEmailDto.email);
  //   }
  // }
}
