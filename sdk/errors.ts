import type { AxiosError as _AxiosError } from 'axios';

/**
 * Represents an error with a code, message, and additional information.
 */
export class CodeError<C extends ErrorCode = ErrorCode, I = unknown>
  implements ICodeError<C, I>
{
  /**
   * The error code.
   */
  code: C;

  /**
   * The error message.
   */
  message: string;

  /**
   * Additional information about the error.
   */
  info: I;

  /**
   * Constructs a new CodeError instance.
   * @param code - The error code.
   * @param message - The error message.
   * @param info - Additional information about the error.
   */
  constructor(code: C, message: string, info: I) {
    this.code = code;
    this.message = message;
    this.info = info;
  }

  /**
   * Checks if the error is an UnauthorizedError.
   * @param error - The error to check.
   * @returns true if the error is an UnauthorizedError, otherwise false.
   */
  isUnauthorizedError(): this is UnauthorizedError {
    // TODO:(Youssef Khalil): Maybe we need to use ts-rest ?
    // @ts-expect-error include bug
    return UNAUTHORIZED_CODES.includes(this.code);
  }

  static fromError<C extends ErrorCode = ErrorCode, I = unknown>(
    error: ICodeError<C, I>
  ): CodeError<C, I> {
    return new CodeError(error.code, error.message, error.info);
  }
}

export interface ICodeError<C extends ErrorCode = ErrorCode, I = unknown> {
  /**
   * The error code.
   */
  code: C;

  /**
   * The error message.
   */
  message: string;

  /**
   * Additional information about the error.
   */
  info: I;
}

export enum ErrorCode {
  AxiosError = -1,

  // General errors
  UnknownError = 1000,
  Forbidden = 1001,
  ProductInsufficientStock = 1002,
  Unknown = 1003,
  ExceededLimit = 1004,
  Invalid = 1005,

  // Authentication errors
  NoToken = 4000,
  Unauthorized = 4001,
  InvalidToken = 4002,
  ExpiredToken = 4003,
  NotVerified = 4004,
  AlreadyVerified = 4005,
  InvalidUser = 4006,

  // Validation errors
  Validation = 5000,
  InvalidEmailOrPassword = 5001,
  UniqueConstraintViolation = 5002,
  MissingPassword = 5003,
  InvalidPassword = 5004,
  InvalidImageId = 5005,
}

export const UNAUTHORIZED_CODES = [
  ErrorCode.ExpiredToken,
  ErrorCode.InvalidToken,
  ErrorCode.InvalidUser,
  ErrorCode.NoToken,
  ErrorCode.NotVerified,
  ErrorCode.Forbidden,
] as const;

export type UniqueError<Info extends string> = CodeError<
  ErrorCode.UniqueConstraintViolation,
  Info
>;

export type UnauthorizedError = CodeError<(typeof UNAUTHORIZED_CODES)[number]>;
export type UnknownError = CodeError<ErrorCode.UnknownError>;

export type AxiosError = CodeError<ErrorCode.AxiosError, _AxiosError>;

export type ForbiddenError = CodeError<ErrorCode.Forbidden>;
