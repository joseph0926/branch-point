import { StatusCode } from 'hono/utils/http-status';

export enum ErrorType {
  UNAUTHORIZED = 'UNAUTHORIZED',
  INVALID_TOKEN = 'INVALID_TOKEN',
  TOKEN_EXPIRED = 'TOKEN_EXPIRED',

  USER_NOT_FOUND = 'USER_NOT_FOUND',
  USER_ALREADY_EXISTS = 'USER_ALREADY_EXISTS',
  INVALID_USER_INPUT = 'INVALID_USER_INPUT',

  DATA_NOT_FOUND = 'DATA_NOT_FOUND',
  INVALID_DATA_FORMAT = 'INVALID_DATA_FORMAT',
  DATABASE_ERROR = 'DATABASE_ERROR',

  INSUFFICIENT_PERMISSIONS = 'INSUFFICIENT_PERMISSIONS',
  RESOURCE_LIMIT_EXCEEDED = 'RESOURCE_LIMIT_EXCEEDED',
  OPERATION_FAILED = 'OPERATION_FAILED',

  INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR',
  EXTERNAL_API_ERROR = 'EXTERNAL_API_ERROR',
  SERVICE_UNAVAILABLE = 'SERVICE_UNAVAILABLE',
}

export const ErrorStatusMap: Record<ErrorType, StatusCode> = {
  [ErrorType.UNAUTHORIZED]: 401,
  [ErrorType.INVALID_TOKEN]: 401,
  [ErrorType.TOKEN_EXPIRED]: 401,
  [ErrorType.USER_NOT_FOUND]: 404,
  [ErrorType.USER_ALREADY_EXISTS]: 409,
  [ErrorType.INVALID_USER_INPUT]: 400,
  [ErrorType.DATA_NOT_FOUND]: 404,
  [ErrorType.INVALID_DATA_FORMAT]: 400,
  [ErrorType.DATABASE_ERROR]: 500,
  [ErrorType.INSUFFICIENT_PERMISSIONS]: 403,
  [ErrorType.RESOURCE_LIMIT_EXCEEDED]: 429,
  [ErrorType.OPERATION_FAILED]: 400,
  [ErrorType.INTERNAL_SERVER_ERROR]: 500,
  [ErrorType.EXTERNAL_API_ERROR]: 502,
  [ErrorType.SERVICE_UNAVAILABLE]: 503,
} as const;

export const ErrorMessages: Record<ErrorType, string> = {
  [ErrorType.UNAUTHORIZED]: '인증이 필요합니다.',
  [ErrorType.INVALID_TOKEN]: '유효하지 않은 토큰입니다.',
  [ErrorType.TOKEN_EXPIRED]: '만료된 토큰입니다.',
  [ErrorType.USER_NOT_FOUND]: '사용자를 찾을 수 없습니다.',
  [ErrorType.USER_ALREADY_EXISTS]: '이미 존재하는 사용자입니다.',
  [ErrorType.INVALID_USER_INPUT]: '잘못된 사용자 입력입니다.',
  [ErrorType.DATA_NOT_FOUND]: '데이터를 찾을 수 없습니다.',
  [ErrorType.INVALID_DATA_FORMAT]: '잘못된 데이터 형식입니다.',
  [ErrorType.DATABASE_ERROR]: '데이터베이스 오류가 발생했습니다.',
  [ErrorType.INSUFFICIENT_PERMISSIONS]: '권한이 부족합니다.',
  [ErrorType.RESOURCE_LIMIT_EXCEEDED]: '리소스 한도를 초과했습니다.',
  [ErrorType.OPERATION_FAILED]: '작업이 실패했습니다.',
  [ErrorType.INTERNAL_SERVER_ERROR]: '내부 서버 오류가 발생했습니다.',
  [ErrorType.EXTERNAL_API_ERROR]: '외부 API 오류가 발생했습니다.',
  [ErrorType.SERVICE_UNAVAILABLE]: '서비스를 사용할 수 없습니다.',
} as const;
