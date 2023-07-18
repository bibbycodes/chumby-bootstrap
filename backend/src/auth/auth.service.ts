import {Injectable, UnauthorizedException} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {User} from "../db/user/user.schema";

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('User') private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async createToken(email: string, password: string) {
    const user = await this.userModel.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      throw new UnauthorizedException();
    }
    const userPayload = { email: user.email };
    return {
      accessToken: this.jwtService.sign(userPayload),
    };
  }
}
