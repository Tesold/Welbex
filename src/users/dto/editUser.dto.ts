import { Length } from "class-validator";

export class UserEditeDto{
    @Length(4, 16, {message: 'Никнейм должен быть 4-16 символов'})
    readonly Nickname: string;
}