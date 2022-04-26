import {
    Model,
    Table,
    Column,
    DataType,
    HasMany,
  } from 'sequelize-typescript';
import { Task } from 'src/tasks/tasks.model';

  
  interface UserCreationInterface {
    Nickname: string;
    Salt: string;
    PasswordHash: string;
  }
  
  @Table({ tableName: 'Users' })
  export class User extends Model<User, UserCreationInterface> {
    @Column({
      type: DataType.INTEGER,
      unique: true,
      autoIncrement: true,
      primaryKey: true,
    })
    ID: number;
  
    @Column({ type: DataType.TEXT, unique: true, allowNull: false })
    Nickname: string;

    @Column({ type: DataType.TEXT, allowNull: false })
    PasswordHash: string;

    @Column({ type: DataType.TEXT, allowNull: false })
    Salt: string;

    @HasMany(()=>Task)
    Tasks: Task[];
  }
  