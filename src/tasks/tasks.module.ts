import { CacheModule, forwardRef, Module } from '@nestjs/common';
import { AuthModuleOptions } from '@nestjs/passport';
import { MulterModule } from '@nestjs/platform-express';
import { SequelizeModule } from '@nestjs/sequelize';
import { AppModule } from 'src/app.module';
import { AuthModule } from 'src/auth/auth.module';
import { UsersModule } from 'src/users/users.module';
import { TasksController } from './tasks.controller';
import { Task } from './tasks.model';
import { TasksService } from './tasks.service';

@Module({
  controllers: [TasksController],
  providers: [TasksService, AuthModuleOptions],
  imports: [
    MulterModule.registerAsync({
      useFactory: () => ({
        dest: './upload',
      }),
    }),
    CacheModule.register(),
    SequelizeModule.forFeature([
      Task
    ]),
    forwardRef(() => AuthModule),
    forwardRef(() => UsersModule),
    forwardRef(() => AppModule),
  ],
  exports: [TasksService],
})
export class TasksModule {}
