import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './users.model';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User) private userRepository: typeof User,
      ) {}

    async createUser(Nickname, Password) {
        try{
            const salt = await bcrypt.genSalt();
            const password = await this.createUserPassword(
             Password,
             salt
            );

            const user = await this.userRepository.create({Nickname, Salt: salt, PasswordHash: password});
    
            return user;
        }
        catch{
            return new BadRequestException();
        }
    }

    async createUserPassword(pass: string, salt: string) {
        const hash = bcrypt.hashSync(pass, salt);
        return hash;
    }

    async getUserByName(Nickname: string, passNeed: boolean) {
        switch (passNeed) {
          case false:
            return await this.userRepository.findOne({
              where: { Nickname },
              attributes: {
                exclude: ['createdAt', 'updatedAt', 'PasswordHash', 'Salt'],
              },
            });
          case true: {
            const user = await this.userRepository.findOne({
              where: { Nickname },
              attributes: {
                exclude: ['createdAt', 'updatedAt'],
              },
            });
            return user;
          }
        }
    }

    async checkPasswordByName(Nickname: string, hash: string) {

        const user = await this.getUserByName(Nickname, true);
        if (
          user &&
          (await bcrypt.hash(hash, user.Salt)) === user.PasswordHash){
          return user;
        }
        return null;
      }
}
