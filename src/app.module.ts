import { CacheModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersController } from './users/users.controller';
import { User } from './users/users.schema';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthController } from './auth/auth.controller';


@Module({
  imports: [
    AuthModule,
    UsersModule,
    CacheModule.register(),
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    MongooseModule.forRoot(process.env.MONGO_HOST),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'build'),
    }),
  ],
  controllers: [ UsersController, AuthController ],
  providers:[],
  exports: [CacheModule, MongooseModule]
})
export class AppModule {}
