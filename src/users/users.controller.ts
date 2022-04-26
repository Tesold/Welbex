import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserDto } from './create-user.dto';
import { UsersService } from './users.service';
import * as bcrypt from 'bcrypt';

@Controller('users')
export class UsersController {
    constructor(private userService: UsersService) {}

    @Post('/create')
    create(@Body() userDto: CreateUserDto) {
      return this.userService.createUser(userDto);
    }

    @Post('/createpass')
    createPass(@Body() {password, salt}) {
      return this.userService.createUserPassword(password, salt);
    }

    @Get('/gensalt')
    async genSalt() {
      return bcrypt.genSalt();
    }
}
