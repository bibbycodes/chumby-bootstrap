import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EmailService } from './email.service';
import {EmailController} from "./email.controller";
import {User, UserSchema} from "../db/user/user.schema";
import {StripeClient} from "../lib/stripe/stripe-client";
import {ConfigModule} from "@nestjs/config";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    ConfigModule
  ],
  controllers: [EmailController],
  providers: [EmailService, StripeClient],
})
export class EmailModule {}
