import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../db/user/user.schema';
import {StripeClient} from "../lib/stripe/stripe-client";
import {getFullName} from "../db/user/user-utils";

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private stripeClient: StripeClient,
  ) {}

  async create(createUserRequest: Partial<User>): Promise<User> {
    const createdUser = new this.userModel(createUserRequest);
    const stripeCustomer = await this.stripeClient.createCustomer(
      createdUser.email,
      createdUser._id,
      getFullName(createdUser),
    );
    createdUser.externalAccounts.stripe.customerId = stripeCustomer.id;
    return createdUser.save();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findOneById(id: string): Promise<User> {
    return this.userModel.findById(id).exec();
  }
  
  async findOneByEmail(email: string): Promise<User> {
    return this.userModel.findOne({email}).exec();
  }
}
