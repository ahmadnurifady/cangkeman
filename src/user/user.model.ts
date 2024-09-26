import { STRING } from 'sequelize';
import { Table, Column, Model, HasMany } from 'sequelize-typescript';
import { Articles } from 'src/article/article.model';

@Table({
  tableName: 'users',
  timestamps: true,
})
export class Users extends Model {
  @Column({
    primaryKey: true,
    unique: true,
    field: 'id',
    type: STRING,
    allowNull: false,
  })
  id: string;

  @Column
  userName: string;

  @Column
  email: string;

  @Column
  password: string;

  @Column
  role: string;

  @Column
  totalCoin: number;

  @HasMany(() => Articles)
  articles: Articles[];
}
