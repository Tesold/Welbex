import { Body, Controller, Get, Post, UseGuards, Request, HttpException } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiBody, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwtAuth.guard';

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
      try{
        return this.userService.createUser(user);
      }
      catch{
        throw new HttpException('Не удалось создать пользователя', 504)
      }
    }

    @ApiOperation({summary: "Получить пользователей"})
    @Get('/get/all')
    getAll() {
      try{
      return this.userService.getAllUsers();
      }
      catch{
        throw new HttpException('Не удалось получить пользователей', 504)
      }
    }

    @ApiOperation({summary: "Редактировать свой профиль"})
    @ApiBody({schema:{
      type: 'object', 
      properties:{
          Nickname: { type: 'string' }
      }}
    })
    @UseGuards(JwtAuthGuard)
    @Post('/edit')
    editMe(@Request() {user, body}) {
      
      try{
          return this.userService.editUser(user.Nickname, body, body.refresh_token);
      }
      catch{
          throw new HttpException('Не удалось отредактировать профиль', 504)
      }
    }

    @ApiOperation({summary: "Удалить свой профиль"})
    @UseGuards(JwtAuthGuard)
    @Get('/delete')
    deleteMe(@Request() {user}) {
      
      try{
          return this.userService.deleteUser(user.Nickname);
      }
      catch{
          throw new HttpException('Не удалось удалить профиль', 504)
      }
    }


}
