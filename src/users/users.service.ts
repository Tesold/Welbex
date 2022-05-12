import { BadRequestException, forwardRef, Inject, Injectable } from '@nestjs/common';
import { User, UserDocument } from './users.schema';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { UserEditeDto } from './dto/editUser.dto';
import { CreateUserDto } from './dto/createUser.dto';
import { AuthService } from 'src/auth/auth.service';


@Injectable()
export class UsersService {
    constructor(
      @Inject(forwardRef(() => AuthService))
      private authService: AuthService,
      @InjectModel(User.name) private userModel: Model<UserDocument>
      ) {}

    async createUser(userDto: CreateUserDto) {
        try{

            const Nickname = userDto.Nickname;
            const Password = userDto.Password

            const salt = await bcrypt.genSalt();
            const password = await this.createUserPassword(
             Password,
             salt
            );

            const CreatedUser = new this.userModel({Nickname, Salt: salt, PasswordHash: password});
    
            const res = await CreatedUser.save();

            return {_id:res._id, Nickname:res.Nickname}
        }
        catch{
            return new BadRequestException();
        }
    }

    async createUserPassword(pass: string, salt: string) {
        return bcrypt.hashSync(pass, salt);
    }

    async getUserByName(Nickname: string, passNeed: boolean) {
        switch (passNeed) {
          case false:
            return await this.userModel.findOne({Nickname}).select(['-PasswordHash', '-Salt', '-__v']).exec();
          case true: {
            return await this.userModel.findOne({Nickname}).exec();
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

    async getAllUsers(){
      return await this.userModel
      .find()
      .select(['-PasswordHash', '-Salt', '-__v'])
      .exec();
    }

    async editUser(Nickname: string, newNickname: UserEditeDto, refresh_token: string){
      const newUser = await this.userModel.findOneAndUpdate({Nickname}, newNickname).exec();
      const newTokens = await this.authService.getEditToken(Nickname, refresh_token, newNickname.Nickname);

      return newTokens;

    }

    async deleteUser(Nickname: string){
      this.authService.LogOut(Nickname);
      return await this.userModel.findOneAndRemove({Nickname}).select(['-PasswordHash', '-Salt', '-__v']).exec();
    }
}
