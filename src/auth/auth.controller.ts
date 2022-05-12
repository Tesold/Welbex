import { Controller, Post, UseGuards, Request, Body, Get } from '@nestjs/common';
import { ApiBody, ApiOperation } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwtAuth.guard';
import { LocalAuthGuard } from './localAuth.guard';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}


    @ApiBody({schema:{
        type: 'object', 
        properties:{
            username:{ type: 'string' },
            password:{ type: "string" },
        }}
    })
    @ApiOperation({summary: "Войти"})
    @UseGuards(LocalAuthGuard)
    @Post('/login')
    async Login(@Request() req) {
      return this.authService.Login(req.user);
    }

    @ApiBody({schema:{
        type: 'object', 
        properties:{
        }
    }
    })
    @ApiOperation({summary: "Выйти"})
    @UseGuards(JwtAuthGuard)
    @Post('/logout')
    async Logout(@Request() req) {
      console.log('LogOut');
      return this.authService.LogOut(req.user.Nickname);
    }


    @ApiOperation({summary: "Получить новый access_token"})
    @ApiBody({schema:{
        type: 'object', 
        properties:{
            Nickname:{ type: 'string' },
            refresh_token:{ type: "string" },
        }}
    })
    @Post('/refresh')
    async Refresh(@Body() { Nickname, refresh_token }) {
      return this.authService.getToken(Nickname, refresh_token);
    }
}
