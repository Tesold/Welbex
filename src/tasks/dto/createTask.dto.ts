import { IsEmail, IsNumber, IsString, Length } from "class-validator";

export class CreateTaskDto{

    @IsNumber()
    @Length(6, 64)
    readonly UserID: number;

    @Length(3, 64)
    readonly Text: string;
}