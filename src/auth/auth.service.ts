import { CACHE_MANAGER, forwardRef, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from 'src/users/users.schema';
import { UsersService } from 'src/users/users.service';
import { Cache } from 'cache-manager';
import { JwtService } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';

@Injectable()
export class AuthService {
    constructor(
        @Inject(forwardRef(() => UsersService))
        private usersService: UsersService,
        private jwtService: JwtService,
        @Inject(CACHE_MANAGER) private cacheManager: Cache,
      ) {}

    async Login(user: User) {

        if (user) {
          let payload =JSON.parse(JSON.stringify({user}));

          payload = {ID:payload.user.ID, Nickname: payload.user.Nickname};
      
          const crypto = require('crypto');
          const refreshToken = crypto.randomBytes(512).toString('hex');
          const accesToken = this.jwtService.sign(payload);
          this.cacheManager.set(user.Nickname, refreshToken, { ttl: 604800 });
          this.cacheManager.set(user.Nickname + '@', accesToken, { ttl: 300 });

          return { access_token: accesToken, refresh_token: refreshToken, payload };
        }
    
        return new UnauthorizedException();
    }

    async getToken(nickname: string, token: string) {

        if ((await this.cacheManager.get(nickname)) === token) {
          const user = await this.usersService.getUserByName(nickname, false);
          let payload = JSON.parse(JSON.stringify({user}));
          payload=payload.user;
          const crypto = require('crypto');
          const refreshToken = crypto.randomBytes(512).toString('hex');
          const accesToken = this.jwtService.sign(payload);
          this.cacheManager.del(user.Nickname);
          this.cacheManager.set(user.Nickname, refreshToken, { ttl: 604800 });
          this.cacheManager.del(user.Nickname + '@');
          this.cacheManager.set(user.Nickname + '@', accesToken, { ttl: 60 });
         
          return { access_token: accesToken, refresh_token: refreshToken, status:201 };
        }
    
        return new UnauthorizedException('не тот рефрештокен');
    }

    async getEditToken(nickname: string, token: string, newNickname){
      if ((await this.cacheManager.get(nickname)) === token) {
        const user = await this.usersService.getUserByName(newNickname, false);
        let payload = JSON.parse(JSON.stringify({user}));
        payload=payload.user;
        const crypto = require('crypto');
        const refreshToken = crypto.randomBytes(512).toString('hex');
        const accesToken = this.jwtService.sign(payload);
        this.cacheManager.del(user.Nickname);
        this.cacheManager.set(user.Nickname, refreshToken, { ttl: 604800 });
        this.cacheManager.del(user.Nickname + '@');
        this.cacheManager.set(user.Nickname + '@', accesToken, { ttl: 60 });
       
        return { access_token: accesToken, refresh_token: refreshToken, status:201 };
    }
    return new UnauthorizedException('не тот рефрештокен');
  }

    async LogOut(Nickname: string){
        this.cacheManager.del(Nickname);
        this.cacheManager.del(Nickname+'@');
    }

    async getSalt(Nickname){
      return (await this.usersService.getUserByName(Nickname, true)).Salt
    }
}
