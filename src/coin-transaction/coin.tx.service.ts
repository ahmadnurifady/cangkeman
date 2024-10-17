import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CoinTransaction } from './coin.tx.model';
import { MyLogger } from 'src/logger/logger';
import { CreateCoinTxDto } from 'src/coin-transaction/dto.model';
import { Users } from 'src/user/user.model';
import { coinTxServiceErrorMessage } from './coin.tx.domain';
import { Sequelize } from 'sequelize-typescript';
import { v4 } from 'uuid';

@Injectable()
export class CoinTransactionService {
  private readonly logger = new MyLogger();

  constructor(
    @Inject('COIN_TX_REPOSITORY')
    private readonly coinRepository: typeof CoinTransaction,
    @Inject('USERS_REPOSITORY')
    private readonly usersRepository: typeof Users,
    @Inject('SEQUELIZE')
    private readonly sequelize: Sequelize,
  ) {}
  async create(
    createCoinTxDto: CreateCoinTxDto,
    idLogTx: string,
    timestamp: string,
  ): Promise<CoinTransaction> {
    const t = await this.sequelize.transaction();

    const findUser = await this.usersRepository.findByPk(
      createCoinTxDto.userId,
    );

    if (!findUser) {
      throw new Error('User not found');
    }

    if (createCoinTxDto.totalCoin < findUser.totalCoin) {
      findUser.totalCoin -= createCoinTxDto.totalCoin;
      await findUser.save({ transaction: t });
    } else {
      throw new Error(coinTxServiceErrorMessage.NOT_ENOUGH_COIN);
    }

    const createCoinTx = await this.coinRepository.create<CoinTransaction>(
      {
        id: v4(),
        ...createCoinTxDto,
        totalAmount: createCoinTxDto.totalCoin * 20000,
      },
      { transaction: t },
    );

    if (!createCoinTx) {
      this.logger.error(
        coinTxServiceErrorMessage.GENERAL_ERROR,
        idLogTx,
        timestamp,
      );
      await t.rollback();
      throw new Error(coinTxServiceErrorMessage.FAILED_CREATE);
    }

    await t.commit();

    return createCoinTx;
  }

  async findAll(
    offset: number,
    limit: number,
    idLogTx: string,
    timestamp: string,
  ): Promise<CoinTransaction[]> {
    const result = await this.coinRepository.findAll({
      offset: offset,
      limit: limit,
    });

    if (result.length < 1) {
      this.logger.error(
        coinTxServiceErrorMessage.GENERAL_ERROR,
        idLogTx,
        timestamp,
      );
      throw new InternalServerErrorException(
        coinTxServiceErrorMessage.GENERAL_ERROR,
      );
    }

    return result;
  }

  async findOne(id: string): Promise<CoinTransaction> {
    const result = await this.coinRepository.findByPk(id);

    if (!result) {
      throw new InternalServerErrorException(
        coinTxServiceErrorMessage.NOT_FOUND,
      );
    }

    return result;
  }

  async remove(id: string): Promise<string> {
    const findCoinTx = await this.coinRepository.findByPk(id);

    if (!findCoinTx) {
      throw new InternalServerErrorException(
        coinTxServiceErrorMessage.NOT_FOUND,
      );
    }

    await findCoinTx.destroy();

    return 'Success Delete CoinTransaction';
  }
}
