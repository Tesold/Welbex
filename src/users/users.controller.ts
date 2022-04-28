import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import * as bcrypt from 'bcrypt';
import { ApiBody } from '@nestjs/swagger';

@Controller('users')
export class UsersController {
    constructor(private userService: UsersService) {}


    @ApiBody({schema:{
      type: 'object', 
      properties:{
          Nickname: { type: 'string' },
          Password: {type: 'string'}
      }}
    })
    @Post('/create')
    create(@Body() user) {
      return this.userService.createUser(user.Nickname, user.Password);
    }
}
