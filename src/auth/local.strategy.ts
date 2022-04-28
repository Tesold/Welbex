
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import {Strategy} from 'passport-local'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    private userService: UsersService,
  ) {
    super();
  }

  async validate(Nickname: string, PasswordHash: string): Promise<any> {

    const user = await this.userService.checkPasswordByName(
      Nickname,
      PasswordHash,
    );
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
    
  }
}
