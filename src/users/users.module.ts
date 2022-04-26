import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from 'src/auth/auth.module';
import { User } from './users.model';
import { UsersService } from './users.service';

@Module({
  providers: [UsersService],
  imports: [
    SequelizeModule.forFeature([
      User,
    ]),
    forwardRef(() => AuthModule),
  ],
  exports: [UsersService],
})
export class UsersModule {}
