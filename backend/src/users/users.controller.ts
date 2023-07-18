import {Controller, Get, Post, Body, Param} from '@nestjs/common';
import {UserService} from './users.service';
import {User} from "../db/user/user.schema";
import {ValidationPipe} from "@nestjs/common/pipes/validation.pipe";

@Controller('auth')
export class UsersController {
  constructor(private readonly userService: UserService) {
  }

  @Get()
  async findAll() {
    return this.userService.findAll();
  }

  @Post('register')
  async create(@Body() createUserRequest: Partial<User>) {
    return this.userService.create(createUserRequest);
  }

  @Post('signup')
  async signUp(@Body(ValidationPipe) createUserDto: { email: string, password: string }): Promise<void> {
    await this.userService.create(createUserDto);
  }

  @Post('login')
  async findOne(@Body(ValidationPipe) data: any): Promise<User> {
    // todo: Validate the password here and if it matches, return the user
    console.log(data)
    const user = await this.userService.findOneByMail(data.email);
    if (user.password !== data.password) {
      throw new Error('Invalid password');
    }
    return user;
  }
}
