import winston from 'winston';
import 'winston-daily-rotate-file';
import { pino } from 'pino';
import path from 'path';
import { AppError } from '../middleware/error.middleware.js';

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

const pinoLogger = pino({
  level: process.env.LOG_LEVEL || 'info',
  transport:
    process.env.NODE_ENV !== 'production'
      ? {
          target: 'pino-pretty',
          options: {
            colorize: true,
            levelFirst: true,
            translateTime: 'SYS:standard',
            ignore: 'pid,hostname',
            messageFormat: '{msg} {context}',
            errorProps: '*',
          },
        }
      : undefined,
  base: {
    env: process.env.NODE_ENV,
    service: 'api-server',
  },
});

export class Logger {
  private static instance: Logger;
  private winstonLogger: winston.Logger;
  private pinoLogger: pino.Logger;

  private constructor() {
    const logsDir = path.join(process.cwd(), 'logs');

    const fileTransport = new winston.transports.DailyRotateFile({
      dirname: logsDir,
      filename: 'application-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json(),
      ),
    });

    const errorFileTransport = new winston.transports.DailyRotateFile({
      dirname: logsDir,
      filename: 'error-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
      level: 'error',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json(),
      ),
    });

    this.winstonLogger = winston.createLogger({
      level: process.env.LOG_LEVEL || 'info',
      defaultMeta: {
        service: 'api-server',
        environment: process.env.NODE_ENV,
      },
      transports: [fileTransport, errorFileTransport],
    });

    this.pinoLogger = pinoLogger.child({});
  }

  static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  private formatMetadata(metadata?: Record<string, any>): Record<string, any> {
    return {
      ...metadata,
      timestamp: new Date().toISOString(),
    };
  }

  private logToBoth(
    level: LogLevel,
    message: string,
    context?: Record<string, any>,
  ): void {
    switch (level) {
      case 'debug':
        this.winstonLogger.debug(message, this.formatMetadata(context));
        break;
      case 'info':
        this.winstonLogger.info(message, this.formatMetadata(context));
        break;
      case 'warn':
        this.winstonLogger.warn(message, this.formatMetadata(context));
        break;
      case 'error':
        this.winstonLogger.error(message, this.formatMetadata(context));
        break;
    }

    if (process.env.NODE_ENV !== 'production') {
      switch (level) {
        case 'debug':
          this.pinoLogger.debug({ context }, message);
          break;
        case 'info':
          this.pinoLogger.info({ context }, message);
          break;
        case 'warn':
          this.pinoLogger.warn({ context }, message);
          break;
        case 'error':
          this.pinoLogger.error({ context }, message);
          break;
      }
    }
  }

  debug(message: string, metadata?: Record<string, any>): void {
    this.logToBoth('debug', message, metadata);
  }

  info(message: string, metadata?: Record<string, any>): void {
    this.logToBoth('info', message, metadata);
  }

  warn(message: string, metadata?: Record<string, any>): void {
    this.logToBoth('warn', message, metadata);
  }

  error(
    message: string,
    error?: Error | AppError,
    metadata?: Record<string, any>,
  ): void {
    const errorMeta = {
      ...metadata,
      error: error
        ? {
            name: error.name,
            message: error.message,
            stack: error.stack,
            ...(error instanceof AppError
              ? {
                  type: error.type,
                  metadata: error.metadata,
                }
              : {}),
          }
        : undefined,
    };

    this.winstonLogger.error(message, this.formatMetadata(errorMeta));

    if (process.env.NODE_ENV !== 'production') {
      this.pinoLogger.error({ err: error, context: errorMeta }, message);
    }
  }
}
