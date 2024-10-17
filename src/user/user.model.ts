import { INTEGER, STRING } from 'sequelize';
import { Table, Column, Model, HasMany } from 'sequelize-typescript';
import { Articles } from 'src/article/article.model';
import { CoinTransaction } from 'src/coin-transaction/coin.tx.model';
import { RoleUser } from 'src/role-user/role.user';

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

  @Column({
    type: STRING,
    field: 'username',
    unique: true,
    allowNull: false,
  })
  userName: string;

  @Column({
    type: STRING,
    allowNull: false,
  })
  email: string;

  @Column({
    type: STRING,
    allowNull: false,
  })
  password: string;

  @Column({
    type: STRING,
    allowNull: false,
  })
  role: RoleUser;

  @Column({
    type: STRING,
    allowNull: false,
  })
  city: string;

  @Column({
    type: INTEGER,
    defaultValue: 0,
    field: 'total_coin',
    allowNull: false,
  })
  totalCoin: number;

  @Column({
    type: INTEGER,
    defaultValue: 0,
    field: 'coin_this_year',
    allowNull: true,
  })
  coinThisYear: number;

  @Column({
    type: INTEGER,
    defaultValue: 0,
    field: 'total_post',
    allowNull: true,
  })
  totalPost: number;

  @HasMany(() => Articles)
  articles: Articles[];

  @HasMany(() => CoinTransaction)
  coinTransactions: CoinTransaction[];
}
