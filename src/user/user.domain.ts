import { LOGTYPE } from 'src/logger/logger.domain';
import {
  logTitleGenerator,
  SPOT_LOG_TYPE,
  MODULE_LOG_TYPE,
} from 'src/utils/log.title.generator';

export class userServiceErrorMessage {
  public static readonly NOT_FOUND = 'user not found';
  public static readonly GENERAL_ERROR = 'INTERNAL SERVER ERROR';
  public static readonly ID_IN_USE = 'id sudah digunakan';
  public static readonly USERNAME_IN_USER = 'username sudah digunakan';
  public static readonly SUCCESS = 'SUCCESS';
}

export const UserServiceLogTitle = {
  ERROR: logTitleGenerator(
    LOGTYPE.ERROR,
    SPOT_LOG_TYPE.SERVICES,
    MODULE_LOG_TYPE.USERS,
  ),
  WARN: logTitleGenerator(
    LOGTYPE.WARN,
    SPOT_LOG_TYPE.SERVICES,
    MODULE_LOG_TYPE.USERS,
  ),
  FATAL: logTitleGenerator(
    LOGTYPE.FATAL,
    SPOT_LOG_TYPE.SERVICES,
    MODULE_LOG_TYPE.USERS,
  ),
  INFO: logTitleGenerator(
    LOGTYPE.INFO,
    SPOT_LOG_TYPE.SERVICES,
    MODULE_LOG_TYPE.USERS,
  ),
};

export const UserControllerLogTitle = {
  ERROR: logTitleGenerator(
    LOGTYPE.ERROR,
    SPOT_LOG_TYPE.CONTROLLER,
    MODULE_LOG_TYPE.USERS,
  ),
  WARN: logTitleGenerator(
    LOGTYPE.WARN,
    SPOT_LOG_TYPE.CONTROLLER,
    MODULE_LOG_TYPE.USERS,
  ),
  FATAL: logTitleGenerator(
    LOGTYPE.FATAL,
    SPOT_LOG_TYPE.CONTROLLER,
    MODULE_LOG_TYPE.USERS,
  ),
  INFO: logTitleGenerator(
    LOGTYPE.INFO,
    SPOT_LOG_TYPE.CONTROLLER,
    MODULE_LOG_TYPE.USERS,
  ),
  SUCCESS: logTitleGenerator(
    LOGTYPE.SUCCESS,
    SPOT_LOG_TYPE.CONTROLLER,
    MODULE_LOG_TYPE.USERS,
  ),
};
