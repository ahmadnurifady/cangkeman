import { Injectable, LoggerService } from '@nestjs/common';
import { createWriteStream, existsSync, mkdirSync } from 'fs';
import * as path from 'path';
import { LOGTYPE } from './logger.domain'; // Definisikan enum LOGTYPE sesuai kebutuhan

@Injectable()
export class MyLogger implements LoggerService {
  private logFilePath: string;
  private logFileStream: any;

  constructor() {
    // Tentukan path untuk log
    this.logFilePath = process.env.LOG_PATH || './src/logger/logResult/log-error.log';
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

  log(message: any, ...optionalParams: any[]) {
    this.writeLogToFile('INFO', message, optionalParams);
    console.log(message, ...optionalParams); // Optional: Log ke console juga
  }

  error(message: any, ...optionalParams: any[]) {
    this.writeLogToFile('ERROR', message, optionalParams);
    console.error(message, ...optionalParams); // Log error ke console
  }

  warn(message: any, ...optionalParams: any[]) {
    this.writeLogToFile('WARN', message, optionalParams);
    console.warn(message, ...optionalParams); // Log warning ke console
  }

  debug?(message: any, ...optionalParams: any[]) {
    this.writeLogToFile('DEBUG', message, optionalParams);
    console.debug(message, ...optionalParams); // Optional: Log debug ke console
  }

  verbose?(message: any, ...optionalParams: any[]) {
    this.writeLogToFile('VERBOSE', message, optionalParams);
    console.log(message, ...optionalParams); // Log verbose ke console
  }

  fatal(message: any, ...optionalParams: any[]) {
    this.writeLogToFile('FATAL', message, optionalParams);
    console.error(message, ...optionalParams); // Log fatal error ke console
  }

  logEvent(logType: LOGTYPE, { logTitle = '', logMessage = '' }) {
    switch (logType) {
      case LOGTYPE.ERROR:
        this.error(logTitle, logMessage);
        break;

      case LOGTYPE.FATAL:
        this.fatal(logTitle, logMessage);
        break;

      case LOGTYPE.INFO:
        this.log(logTitle, logMessage);
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
