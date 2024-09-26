import { Injectable, LoggerService } from '@nestjs/common';
import { createWriteStream, existsSync, mkdirSync } from 'fs';
import * as path from 'path';
import { LOGTYPE } from './logger.domain'; // Definisikan enum LOGTYPE sesuai kebutuhan

@Injectable()
export class MyLogger implements LoggerService {
  private logFilePath: string;
  private logFileStream: any;

  private mantapJiwa(message: string, idLogTx: string, timestamp: string) {
    return `[${timestamp}] - ${idLogTx} - + ${message}]`;
  }

  constructor() {
    // Tentukan path untuk log
    this.logFilePath =
      process.env.LOG_PATH || './src/logger/logResult/log-error.log';
    this.ensureLogDirectoryExists();
    this.logFileStream = this.createRotatingLogStream();
  }

  private ensureLogDirectoryExists() {
    const logDir = path.dirname(this.logFilePath);
    if (!existsSync(logDir)) {
      mkdirSync(logDir, { recursive: true });
    }
  }

  private createRotatingLogStream() {
    // Rotasi file log harian (1 hari)
    return createWriteStream(this.logFilePath, { flags: 'a' });
  }

  private writeLogToFile(logType: string, logTitle: string, logMessage: any) {
    // Hanya simpan log jika logType adalah "ERROR" atau "FATAL"
    if (logType === 'ERROR' || logType === 'FATAL') {
      const timestamp = new Date().toISOString();
      const logData = {
        timestamp,
        logType,
        logTitle,
        logMessage,
      };

      // Tulis log ke file
      this.logFileStream.write(JSON.stringify(logData) + '\n');
    }
  }

  log(
    message: any,
    idLogTx: string,
    timestamp: string,
    ...optionalParams: any[]
  ) {
    console.log(
      this.mantapJiwa(message, idLogTx, timestamp),
      ...optionalParams,
    ); // Log ke console
  }

  error(message: any, ...optionalParams: any[]) {
    this.writeLogToFile('ERROR', message, optionalParams);
    console.error(message, ...optionalParams); // Log error ke console
  }

  warn(message: any, ...optionalParams: any[]) {
    console.warn(message, ...optionalParams); // Log warning ke console
  }

  debug?(message: any, ...optionalParams: any[]) {
    console.debug(message, ...optionalParams); // Optional: Log debug ke console
  }

  verbose?(message: any, ...optionalParams: any[]) {
    console.log(message, ...optionalParams); // Log verbose ke console
  }

  fatal(message: any, ...optionalParams: any[]) {
    this.writeLogToFile('FATAL', message, optionalParams);
    console.error(message, ...optionalParams); // Log fatal error ke console
  }

  logEvent(
    logType: LOGTYPE,
    { logTitle = '', logMessage = '', timestamp = '' },
  ) {
    switch (logType) {
      case LOGTYPE.ERROR:
        this.error(logTitle, logMessage);
        break;

      case LOGTYPE.FATAL:
        this.fatal(logTitle, logMessage);
        break;

      case LOGTYPE.INFO:
        this.log(logTitle, logMessage, timestamp);
        break;

      case LOGTYPE.WARN:
        this.warn(logTitle, logMessage);
        break;

      case LOGTYPE.DEBUG:
        this.debug(logTitle, logMessage);
        break;

      case LOGTYPE.VERBOSE:
        this.verbose(logTitle, logMessage);
        break;
    }
  }
}
