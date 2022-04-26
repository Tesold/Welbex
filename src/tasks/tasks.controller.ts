import { Body, Controller, Get, Param, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwtAuth.guard';
import { CreateTaskDto } from './dto/createTask.dto';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {

    constructor(
        private readonly tasksService: TasksService
        ) {}

        
    
    @ApiBody({schema:{
        type: 'object', 
        properties:{
            Text: { type: 'string' },
        }}
    })
    @ApiOperation({summary: "Создать новую запись"})
    @UseInterceptors(FileInterceptor('file'))
    @Post('/create')
    async CreateTask(@UploadedFile() file: Express.Multer.File, @Body() task:CreateTaskDto)
    {
        return this.tasksService.createTask(task);
    }

    @ApiOperation({summary: "Отредактировать запись"})
    @ApiBearerAuth()
    @ApiBody({schema:{type: 'object', properties:{ID: {type: 'number'}, Text: {type: 'string'}}}})
    @UseGuards(JwtAuthGuard)
    @Post('/edit')
    async EditTask(@Body() task)
    {
        return this.tasksService.editTask(task.ID, task.Text);
    }

    @ApiOperation({summary: "Получить количество страниц"})
    @Get('/pages')
    getPages() {
      return this.tasksService.getPages();
    }
}
