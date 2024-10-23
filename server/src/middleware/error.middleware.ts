import { Context, Next } from 'hono';
import { HTTPException } from 'hono/http-exception';
import { StatusCode } from 'hono/utils/http-status';
import {
  ErrorType,
  ErrorStatusMap,
  ErrorMessages,
} from '../types/error.type.js';
import { Logger } from '../utils/logger.js';

export class AppError extends Error {
  constructor(
    public type: ErrorType,
    public message: string = ErrorMessages[type],
    public metadata?: Record<string, any>,
  ) {
    super(message);
    this.name = 'AppError';
  }

  get statusCode(): StatusCode {
    return ErrorStatusMap[this.type];
  }
}

const logger = Logger.getInstance();

export async function errorHandler(c: Context, next: Next) {
  try {
    await next();
  } catch (error) {
    let response = {
      success: false,
      error: {
        message: 'Internal Server Error',
        code: ErrorType.INTERNAL_SERVER_ERROR,
        details: {},
      },
    };

    if (error instanceof AppError) {
      c.status(error.statusCode);
      response.error.message = error.message;
      response.error.code = error.type;
      if (error.metadata) {
        response.error.details = error.metadata;
      }

      logger.error(`Business error occurred: ${error.type}`, error, {
        metadata: error.metadata,
      });
    } else if (error instanceof HTTPException) {
      c.status(error.status as StatusCode);
      response.error.message = error.message;
      response.error.code = ErrorType.OPERATION_FAILED;

      logger.error(`HTTP exception occurred: ${error.status}`, error);
    } else {
      c.status(500);
      logger.error(
        'Unexpected error occurred',
        error instanceof Error ? error : new Error(String(error)),
      );
    }

    return c.json(response);
  }
}
