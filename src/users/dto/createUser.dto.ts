import { Length } from "class-validator";


export class CreateUserDto{
    @Length(4, 16, {message: 'Никнейм должен быть 4-16 символов'})
    readonly Nickname: string;

    @Length(8, 32, {message: 'Пароль должен быть 8-32 символов'})
    readonly Password: string;
}