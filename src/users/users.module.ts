import { forwardRef, Global, Module } from '@nestjs/common';
import { MongooseModule, Schema } from '@nestjs/mongoose';
import { AppModule } from 'src/app.module';
import { AuthModule } from 'src/auth/auth.module';
import { AuthService } from 'src/auth/auth.service';
import { UsersController } from './users.controller';
import { User, UserSchema } from './users.schema';
import { UsersService } from './users.service';

@Global()
@Module({
  providers: [UsersService],
  imports: [
    MongooseModule.forFeature([{name: User.name, schema: UserSchema}]),
    forwardRef(()=>AuthModule)
  ],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
