import { INTEGER, STRING } from 'sequelize';
import {
  BelongsTo,
  Column,
  ForeignKey,
  Table,
  Model,
} from 'sequelize-typescript';
import { Users } from 'src/user/user.model';

@Table({
  tableName: 'coin_transactions',
  timestamps: true,
})
export class CoinTransaction extends Model {
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
    allowNull: false,
    field: 'user_id',
  })
  userId: string;

  @Column({
    type: INTEGER,
    field: 'total_coin',
    allowNull: false,
    defaultValue: 0,
  })
  totalCoin: number;

  @Column({
    type: INTEGER,
    field: 'total_amount',
    allowNull: false,
    defaultValue: 0,
  })
  totalAmount: number;

  @BelongsTo(() => Users)
  users: Users;
}
