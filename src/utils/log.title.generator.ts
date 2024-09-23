import { LOGTYPE } from 'src/logger/logger.domain';

export const SPOT_LOG_TYPE = {
  CONTROLLER: 'CONTROLLER',
  ROUTER: 'ROUTER',
  SERVICES: 'SERVICES',
  MIDDLEWARE: 'MIDDLEWARE',
};

export const MODULE_LOG_TYPE = {
  USERS: 'USERS',
  LINENS: 'LINENS',
  TRANSACTION: 'TRANSACTION',
  AUTHMIDDLEWARE: 'AUTHMIDDLEWARE',
  ADMIN: 'ADMIN',
  REPORT: 'REPORT',
  ORDER: 'ORDER',
  ROLE: 'ROLE',
  CATEGORY: 'CATEGORY',
};

export const logTitleGenerator = (
  type: LOGTYPE,
  spotLog: string,
  moduleLogType: string,
) => {
  return `[${moduleLogType}-${spotLog}-${type}]`;
};
