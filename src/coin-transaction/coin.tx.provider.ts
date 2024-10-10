import { Provider } from '@nestjs/common';
import { CoinTransaction } from './coin.tx.model';

export const coinTxProvider: Provider[] = [
  {
    provide: 'COIN_TX_REPOSITORY',
    useValue: CoinTransaction,
  },
];
