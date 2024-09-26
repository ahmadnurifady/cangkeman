import { STRING } from 'sequelize';
import {
  Table,
  Column,
  Model,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Users } from 'src/user/user.model';

@Table({
  tableName: 'articles',
  timestamps: true,
})
export class Articles extends Model {
  @Column({
    primaryKey: true,
    unique: true,
    field: 'id',
    type: STRING,
    allowNull: false,
  })
  id: string;

  @ForeignKey(() => Users)
  @Column({
    allowNull: true,
    unique: true,
  })
  userId: string;

  @Column({
    allowNull: false,
  })
  userName: string;

  @Column({
    allowNull: false,
  })
  title: string;

  @Column
  content: string;

  @Column({
    allowNull: false,
  })
  status: boolean = false;

  @BelongsTo(() => Users)
  users: Users;
}
