import { IsString, Length, Validate } from 'class-validator';

import { CustomNickname } from 'src/auth/validator';

export class CreateUserDto {

  @Validate(CustomNickname)
  @Length(2, 16)
  @IsString({ message: 'Поле должно быть строкой.' })
  readonly Nickname: string;

  @IsString({ message: 'Не верный формат пароля.' })
  @Length(32, 1024)
  readonly PasswordHash: string;

  @Length(2, 1024)
  @IsString({ message: 'Поле должно быть строкой.' })
  readonly Salt: string;
}
