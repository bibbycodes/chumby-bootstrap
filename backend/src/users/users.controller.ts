import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { UserService } from './users.service';
import {User} from "../db/user/user.schema";

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.userService.findOneById(id);
  }

  @Post()
  async create(@Body() createUserRequest: Partial<User>) {
    return this.userService.create(createUserRequest);
  }
}
