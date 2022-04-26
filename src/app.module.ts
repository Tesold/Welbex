import { CacheModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { AppController } from './app.controller';
import { TasksController } from './tasks/tasks.controller';
import { Task } from './tasks/tasks.model';
import { TasksModule } from './tasks/tasks.module';
import { TasksService } from './tasks/tasks.service';
import { UsersController } from './users/users.controller';
import { User } from './users/users.model';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './auth/constants';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';


@Module({
  imports: [
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '300s' },
    }),
    CacheModule.register(),
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_NAME,
      password: process.env.POSTGRES_PASS,
      database: process.env.POSTGRES_DB,
      models: [
        Task,
        User
      ],
      autoLoadModels: true,
      synchronize: true,
      sync: { alter: true },
    }),
    SequelizeModule.forFeature([Task]),
    TasksModule,
    UsersModule,
    AuthModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'build'),
    }),
  ],
  controllers: [AppController, TasksController, UsersController],
  providers: [TasksService],
  exports: [JwtModule]
})
export class AppModule {}
