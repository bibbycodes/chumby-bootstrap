import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {MessagesService} from './messages.service';
import {ConfigModule, ConfigService} from "@nestjs/config";
import {MailingList, MailingListSchema} from "../db/email/mailing-list.schema";
import {MessagesController} from "./messages.controller";
import {Messenger} from "../lib/messenger/messenger";
import {NodeMailerClient} from "../lib/email/node-mailer-client";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: MailingList.name, schema: MailingListSchema }]),
    ConfigModule
  ],
  controllers: [MessagesController],
  providers: [MessagesService, ConfigService, NodeMailerClient, Messenger],
})
export class MessagesModule {}
