import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {EmailService} from './email.service';
import {EmailController} from "./email.controller";
import {ConfigModule} from "@nestjs/config";
import {Email, EmailSchema} from "../db/email/email.schema";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Email.name, schema: EmailSchema }]),
    ConfigModule
  ],
  controllers: [EmailController],
  providers: [EmailService],
})
export class EmailModule {}
