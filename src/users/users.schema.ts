import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

  interface UserCreationInterface {
    Nickname: string;
    Salt: string;
    PasswordHash: string;
  }
  
  @Schema()
  export class User implements UserCreationInterface {
    
    @Prop()
    ID: number;
  
    @Prop({ required: true, unique: true })
    Nickname: string;

    @Prop({ required: true })
    PasswordHash: string;

    @Prop({ required: true })
    Salt: string;
  }

  export const UserSchema = SchemaFactory.createForClass(User)
  