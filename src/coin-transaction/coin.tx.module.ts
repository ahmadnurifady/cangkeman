import { Module } from '@nestjs/common';
import { CoinTransactionService } from './coin.tx.service';
import { CoinTransactionController } from './coin.tx.controller';
import { coinTxProvider } from './coin.tx.provider';
import { DatabaseModule } from 'src/database/database.module';
import { usersProvider } from 'src/user/user.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [CoinTransactionController],
  providers: [CoinTransactionService, ...coinTxProvider, ...usersProvider],
})
export class CoinTransactionModule {}
