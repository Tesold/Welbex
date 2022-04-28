import {
    Model,
    Table,
    Column,
    DataType,
    ForeignKey,
    BelongsTo,
  } from 'sequelize-typescript';
import { User } from 'src/users/users.model';

  
  interface TaskCreationInterface {
    UserName: string;
    Email: string;
    Text:string;
  }
  
  @Table({ tableName: 'Tasks' })
  export class Task extends Model<Task, TaskCreationInterface> {

    @Column({
      type: DataType.INTEGER,
      unique: true,
      autoIncrement: true,
      primaryKey: true,
    })
    ID: number;
  
    @ForeignKey(() => User)
    @Column({ type: DataType.INTEGER, allowNull: false})
    UserID: number;

    @Column({ type: DataType.TEXT, allowNull: false })
    Text: string;

    @Column({ type: DataType.TEXT, allowNull: true })
    PathImage: string;

    @Column({ type: DataType.TEXT, allowNull: true })
    PathVideo: string;

    @Column({ type: DataType.BOOLEAN, defaultValue: false })
    Edited: boolean;

    @BelongsTo(() => User)
    User: User;

  }