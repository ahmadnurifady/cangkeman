import { LOGTYPE } from 'src/logger/logger.domain';
import {
  logTitleGenerator,
  SPOT_LOG_TYPE,
  MODULE_LOG_TYPE,
} from 'src/utils/log.title.generator';

export class articleServiceErrorMessage {
  public static readonly NOT_FOUND = 'Article not found';
  public static readonly GENERAL_ERROR = 'INTERNAL SERVER ERROR';
  public static readonly ID_IN_USE = 'id sudah digunakan';
  public static readonly USERNAME_IN_USER = 'username sudah digunakan';
}

export const ArticleServiceLogTitle = {
  ERROR: logTitleGenerator(
    LOGTYPE.ERROR,
    SPOT_LOG_TYPE.SERVICES,
    MODULE_LOG_TYPE.ARTICLE,
  ),
  WARN: logTitleGenerator(
    LOGTYPE.WARN,
    SPOT_LOG_TYPE.SERVICES,
    MODULE_LOG_TYPE.ARTICLE,
  ),
  FATAL: logTitleGenerator(
    LOGTYPE.FATAL,
    SPOT_LOG_TYPE.SERVICES,
    MODULE_LOG_TYPE.ARTICLE,
  ),
  INFO: logTitleGenerator(
    LOGTYPE.INFO,
    SPOT_LOG_TYPE.SERVICES,
    MODULE_LOG_TYPE.ARTICLE,
  ),
};

export const ArticleControllerLogTitle = {
  ERROR: logTitleGenerator(
    LOGTYPE.ERROR,
    SPOT_LOG_TYPE.CONTROLLER,
    MODULE_LOG_TYPE.ARTICLE,
  ),
  WARN: logTitleGenerator(
    LOGTYPE.WARN,
    SPOT_LOG_TYPE.CONTROLLER,
    MODULE_LOG_TYPE.ARTICLE,
  ),
  FATAL: logTitleGenerator(
    LOGTYPE.FATAL,
    SPOT_LOG_TYPE.CONTROLLER,
    MODULE_LOG_TYPE.ARTICLE,
  ),
  INFO: logTitleGenerator(
    LOGTYPE.INFO,
    SPOT_LOG_TYPE.CONTROLLER,
    MODULE_LOG_TYPE.ARTICLE,
  ),
  SUCCESS: logTitleGenerator(
    LOGTYPE.SUCCESS,
    SPOT_LOG_TYPE.CONTROLLER,
    MODULE_LOG_TYPE.USERS,
  ),
};
