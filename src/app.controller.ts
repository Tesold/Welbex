import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { TasksService } from './tasks/tasks.service';

@Controller()
export class AppController {
  constructor(
    private readonly tasksService: TasksService
    ) {}

  @ApiOperation({summary: "Получить страницу записей (параметр - номер страницы)"})
  @Post('/')
  getTasks(@Body() body) {
    return this.tasksService.getTasks(body.page);
  }

}
