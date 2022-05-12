import { CacheModule, forwardRef, Module } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthModuleOptions, PassportModule } from '@nestjs/passport';
import { AppModule } from 'src/app.module';
import { UsersModule } from 'src/users/users.module';
import { UsersService } from 'src/users/users.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { jwtConstants } from './constants';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';

@Module({
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy, AuthModuleOptions],
  imports: [
    CacheModule.register(),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '900s' },
    }),
    PassportModule,
    forwardRef(()=>UsersModule),
  ],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
