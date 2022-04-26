import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { HttpErrorByCode } from '@nestjs/common/utils/http-error-by-code.util';
import { InjectModel } from '@nestjs/sequelize';
import { CreateTaskDto } from './dto/createTask.dto';
import { Task } from './tasks.model';

@Injectable()
export class TasksService {
    constructor(
        @InjectModel(Task) private tasksRepository: typeof Task,
      ){}

    async getTasks(page:number){

        return this.tasksRepository.findAll({
            attributes: {
                exclude: ['updatedAt'],
            },
            limit: 3, 
            offset: page>0?(page-1)*3:0
    })}

    async createTask(taskDto: CreateTaskDto){
        const task = await this.tasksRepository.create(taskDto);


        return "Задача создана!"
    }

    async editTask(ID: number, Text: string){
        try{
            this.tasksRepository.update({Text, Edited: true}, {where: {ID}});

            return "Задача отредактирована!"
        }
        catch
        {
            throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
        }
    }

    async getPages()
    {
        const count = (await this.tasksRepository.findAndCountAll()).count;

        return Math.ceil(count/3);
    }
}
