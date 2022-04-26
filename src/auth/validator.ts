import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';

@ValidatorConstraint({ name: 'CustomNickname', async: false })
export class CustomNickname implements ValidatorConstraintInterface {
  validate(text: string, args: ValidationArguments) {
    return text.includes('@'); // for async validations you must return a Promise<boolean> here
  }

  defaultMessage(args: ValidationArguments) {
    // here you can provide default error message if validation failed
    return 'Wrong Nickname! Dont use @';
  }
}