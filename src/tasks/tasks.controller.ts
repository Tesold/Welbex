import { Body, Controller, Get, Request, Post, UploadedFile, UseGuards, UseInterceptors, StreamableFile, Param } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiOperation } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { JwtAuthGuard } from 'src/auth/jwtAuth.guard';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {

    constructor(
        private readonly tasksService: TasksService
        ) { }
          
    @ApiBody({schema:{
        type: 'object', 
        properties:{
            Text: { type: 'string' },
            file: {type: 'file'}
        }}
    })
    @ApiOperation({summary: "Создать новую запись"})
    @UseGuards(JwtAuthGuard)
    @Post('/create')
    @UseInterceptors(FileInterceptor('blog_image', {
        storage: diskStorage({
          destination: './uploadedFiles/avatars',
          filename: (req, file, cb)=>{
            cb(null, ""+Date.now()+file.originalname)},
        },
        ),
        fileFilter: (req, file, cb) => {
  
            if(file.mimetype === "image/png" || 
            file.mimetype === "image/jpg"|| 
            file.mimetype === "image/jpeg"||
            file.mimetype === "video/mp4"
            ){
                cb(null, true);
            }
            else{
                cb(null, false);
            }
         }   ,
      }))
    async CreateTask(@UploadedFile() file: Express.Multer.File, @Body() {body}, @Request() {user})
    {
        return this.tasksService.createTask({
            Text: body,
            UserID: user.ID, 
            PathImage: file?.mimetype!=='video/mp4'?file?.path:null, 
            PathVideo: file?.mimetype==='video/mp4'?file?.path:null
        },
             file);
    }

    @ApiOperation({summary: "Отредактировать запись"})
    @ApiBearerAuth()
    @ApiBody({schema:{type: 'object', properties:{ID: {type: 'number'}, Text: {type: 'string'}}}})
    @UseGuards(JwtAuthGuard)
    @Post('/edit')
    async EditTask(@Request() {user, body})
    {
        return this.tasksService.editTask(body.ID, body.Text, user.ID);
    }

    @ApiOperation({summary: "Получить количество страниц"})
    @Get('/pages')
    getPages() {
      return this.tasksService.getPages();
    }

    @ApiOperation({summary: "Удалить пост"})
    @ApiBody({schema:{type: 'object', properties:{ID: {type: 'number'}}}})
    @UseGuards(JwtAuthGuard)
    @Post('/delete')
    deleteTask(@Request() {user, body}) {
      return this.tasksService.deleteTask(body.ID, user.ID);
    }
}
