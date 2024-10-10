import { LOGTYPE } from 'src/logger/logger.domain';
import {
  logTitleGenerator,
  MODULE_LOG_TYPE,
  SPOT_LOG_TYPE,
} from 'src/utils/log.title.generator';

export class coinTxServiceErrorMessage {
  public static readonly NOT_FOUND = 'Transaction Coin not found';
  public static readonly GENERAL_ERROR = 'INTERNAL SERVER ERROR';
  public static readonly ID_IN_USE = 'id sudah digunakan';
  public static readonly FAILED_CREATE = 'Failed to create transaction coin';
  public static readonly NOT_ENOUGH_COIN =
    'Tidak dapat menukarkan coin karena melebihi batas saldo coin';
}

export const CoinTxServiceLogTitle = {
  ERROR: logTitleGenerator(
    LOGTYPE.ERROR,
    SPOT_LOG_TYPE.SERVICES,
    MODULE_LOG_TYPE.COIN_TRANSACTION,
  ),
  WARN: logTitleGenerator(
    LOGTYPE.WARN,
    SPOT_LOG_TYPE.SERVICES,
    MODULE_LOG_TYPE.COIN_TRANSACTION,
  ),
  FATAL: logTitleGenerator(
    LOGTYPE.FATAL,
    SPOT_LOG_TYPE.SERVICES,
    MODULE_LOG_TYPE.COIN_TRANSACTION,
  ),
  INFO: logTitleGenerator(
    LOGTYPE.INFO,
    SPOT_LOG_TYPE.SERVICES,
    MODULE_LOG_TYPE.COIN_TRANSACTION,
  ),
};

export const CoinTxControllerLogTitle = {
  ERROR: logTitleGenerator(
    LOGTYPE.ERROR,
    SPOT_LOG_TYPE.CONTROLLER,
    MODULE_LOG_TYPE.COIN_TRANSACTION,
  ),
  WARN: logTitleGenerator(
    LOGTYPE.WARN,
    SPOT_LOG_TYPE.CONTROLLER,
    MODULE_LOG_TYPE.COIN_TRANSACTION,
  ),
  FATAL: logTitleGenerator(
    LOGTYPE.FATAL,
    SPOT_LOG_TYPE.CONTROLLER,
    MODULE_LOG_TYPE.COIN_TRANSACTION,
  ),
  INFO: logTitleGenerator(
    LOGTYPE.INFO,
    SPOT_LOG_TYPE.CONTROLLER,
    MODULE_LOG_TYPE.COIN_TRANSACTION,
  ),
  SUCCESS: logTitleGenerator(
    LOGTYPE.SUCCESS,
    SPOT_LOG_TYPE.CONTROLLER,
    MODULE_LOG_TYPE.COIN_TRANSACTION,
  ),
};
