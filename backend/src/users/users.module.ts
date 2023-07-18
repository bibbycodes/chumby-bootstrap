import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserService } from './users.service';
import {UsersController} from "./users.controller";
import {User, UserSchema} from "../db/user/user.schema";
import {StripeClient} from "../lib/stripe/stripe-client";
import {ConfigModule} from "@nestjs/config";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    ConfigModule
  ],
  controllers: [UsersController],
  providers: [UserService, StripeClient],
})
export class UsersModule {}
