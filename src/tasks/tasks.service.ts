import { BadRequestException, HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { HttpErrorByCode } from '@nestjs/common/utils/http-error-by-code.util';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { User } from 'src/users/users.model';
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
            include:[{model: User, attributes:{exclude: ["PasswordHash", "Salt"]}}],
            limit: 3, 
            offset: page>0?(page-1)*3:0
    })}

    async createTask(taskDto: CreateTaskDto, file:any){
        try{
        const task = await this.tasksRepository.create(taskDto);
        if(task)
        return "Задача создана!"

        return "Не удалось!"
        }
        catch{
            throw new BadRequestException();
        }
    }

    async editTask(ID: number, Text: string, UserID: number){
        try{
            if(
            await this.tasksRepository.update(
                {Text, Edited: true},
                {where: {
                    [Op.and]: [
                        {ID},
                        {UserID}
                    ]}}))
            return "Задача отредактирована!";

            throw new UnauthorizedException();
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

    async deleteTask(ID:number , UserID:number){
        if(await this.tasksRepository.destroy({where: {
            [Op.and]: [
                {ID},
                {UserID}
            ]}}))
        return true;

        return false;
    }
}
