import { CacheModule, forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthModuleOptions, PassportModule } from '@nestjs/passport';
import { AppModule } from 'src/app.module';
import { UsersModule } from 'src/users/users.module';
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
    forwardRef(() => UsersModule),
    forwardRef(() => AppModule),
    PassportModule,
  ],
  exports: [AuthService],
})
export class AuthModule {}
