import type { Result, Err } from '@sapphire/result';
import { ok, err } from '@sapphire/result';
import type {
  Axios,
  AxiosRequestConfig,
  AxiosResponse,
  CreateAxiosDefaults,
  AxiosError as _AxiosError,
} from 'axios';
import axios from 'axios';
import { z } from 'zod';

import type { AxiosError, ICodeError, UnknownError } from '@/types';
import { CodeError, ErrorCode } from '@/types';

/**
 * Represents an error that can occur during a request, including Axios errors and custom errors.
 */
export type RequestError<T extends CodeError = CodeError> =
  | T
  | UnknownError
  | AxiosError;

/**
 * Middleware function to handle errors during request.
 * @param error - The error occurred during the request.
 * @param fetch - The instance of Fetch.
 * @returns boolean - Whether the error was handled.
 */
export type ErrorMiddleware = (error: RequestError, fetch: Fetch) => void;

/**
 * Represents the result of a request, either successful with a value or failed with an error.
 */
export type RequestResult<T, E extends CodeError = CodeError> = Result<
  T,
  RequestError<E>
>;

/**
 * A utility class for making HTTP requests with error handling.
 */
export class Fetch {
  public base: Axios;
  public errorMiddleware?: ErrorMiddleware;

  constructor(config?: CreateAxiosDefaults) {
    this.base = axios.create(config);
  }

  /**
   * Sets the error middleware function.
   * @param m - The error middleware function.
   */
  setErrorMiddleware(m: ErrorMiddleware) {
    this.errorMiddleware = m;
  }

  /**
   * Makes a GET request.
   * @param url - The URL to send the request to.
   * @param config - (Optional) The Axios request config.
   * @returns A Promise that resolves with the result of the request.
   * @example
   * const result = await fetch.get('/api/data');
   * if (result.isOk()) {
   *   const responseData = result.unwrap().data;
   *   // Handle successful response
   * } else {
   *   const error = result.unwrapErr();
   *   // Handle error
   * }
   */
  async get<T = unknown, E extends CodeError = CodeError, D = unknown>(
    url: string,
    config?: AxiosRequestConfig<D>
  ): Promise<RequestResult<AxiosResponse<T>, E>> {
    return this.base
      .get<T>(url, config)
      .then(r => ok(r))
      .catch(e => this.resolveError<E>(e));
  }

  /**
   * Makes a POST request.
   * @param url - The URL to send the request to.
   * @param data - The data that will be send with request
   * @param config - The Axios request config.
   * @returns A Promise that resolves with the result of the request.
   * @example
   * const result = await fetch.post('/api/data');
   * if (result.isOk()) {
   *   const responseData = result.unwrap().data;
   *   // Handle successful response
   * } else {
   *   const error = result.unwrapErr();
   *   // Handle error
   * }
   */
  async post<T = unknown, E extends CodeError = CodeError, D = unknown>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig<D>
  ): Promise<RequestResult<AxiosResponse<T>, E>> {
    const res = await this.base
      .post<T>(url, data, config)
      .then(r => ok(r))
      .catch(e => this.resolveError<E>(e));
    return res;
  }

  /**
   * Makes a PATCH request.
   * @param url - The URL to send the request to.
   * @param data - The data that will be send with request
   * @param config - The Axios request config.
   * @returns A Promise that resolves with the result of the request.
   * @example
   * const result = await fetch.patch('/api/data');
   * if (result.isOk()) {
   *   const responseData = result.unwrap().data;
   *   // Handle successful response
   * } else {
   *   const error = result.unwrapErr();
   *   // Handle error
   * }
   */
  async patch<T = unknown, E extends CodeError = CodeError, D = unknown>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig<D>
  ): Promise<RequestResult<AxiosResponse<T>, E>> {
    const res = await this.base
      .patch<T>(url, data, config)
      .then(r => ok(r))
      .catch(e => this.resolveError<E>(e));
    return res;
  }

  /**
   * Makes a PUT request.
   * @param url - The URL to send the request to.
   * @param data - The data that will be send with request
   * @param config - The Axios request config.
   * @returns A Promise that resolves with the result of the request.
   * @example
   * const result = await fetch.put('/api/data');
   * if (result.isOk()) {
   *   const responseData = result.unwrap().data;
   *   // Handle successful response
   * } else {
   *   const error = result.unwrapErr();
   *   // Handle error
   * }
   */
  async put<T = unknown, E extends CodeError = CodeError, D = unknown>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig<D>
  ): Promise<RequestResult<AxiosResponse<T>, E>> {
    const res = await this.base
      .put<T>(url, data, config)
      .then(r => ok(r))
      .catch(e => this.resolveError<E>(e));
    return res;
  }

  /**
   * Makes a DELETE request.
   * @param url - The URL to send the request to.
   * @param config - The Axios request config.
   * @returns A Promise that resolves with the result of the request.
   * @example
   * const result = await fetch.delete('/api/data');
   * if (result.isOk()) {
   *   const responseData = result.unwrap().data;
   *   // Handle successful response
   * } else {
   *   const error = result.unwrapErr();
   *   // Handle error
   * }
   */
  async delete<T = unknown, E extends CodeError = CodeError, D = unknown>(
    url: string,
    config?: AxiosRequestConfig<D>
  ): Promise<RequestResult<AxiosResponse<T>, E>> {
    const res = await this.base
      .delete<T>(url, config)
      .then(r => ok(r))
      .catch(e => this.resolveError<E>(e));
    return res;
  }

  /**
   * Resolves Axios errors into custom errors.
   * @param e - The Axios error.
   * @returns The custom error.
   */
  protected resolveError<T extends CodeError>(
    e: _AxiosError<CodeError>
  ): Err<RequestError<T>> {
    const data = e.response?.data;

    const errorData = Fetch.isCodeError(data)
      ? CodeError.fromError(data)
      : new CodeError(ErrorCode.AxiosError, 'AXIOS_ERROR', e);

    this.errorMiddleware?.(errorData, this);

    return err(errorData) as never;
  }

  /**
   * Checks if an object conforms to the CodeError interface.
   * @param err - The error object to check.
   * @returns true if the object is a CodeError, otherwise false.
   */
  static isCodeError(err: unknown): err is ICodeError {
    return errorSchema.safeParse(err).success;
  }

  /**
   * Checks if an object appears to be a CodeError without providing full type safety.
   * @param err - The error object to check.
   * @returns true if the object seems to be a CodeError, otherwise false.
   * @remarks This method performs a quick check by verifying if the object is an object, not null, and has an 'info' property.
   * It does not provide full type safety and should be used with caution.
   * @example
   * if (Fetch.isCodeErrorUnsafe(error)) {
   *   // Handle the error as a CodeError
   * } else {
   *   // Handle the error differently
   * }
   */
  static isCodeErrorUnsafe<T extends CodeError = CodeError>(
    err: unknown
  ): err is T {
    return typeof err == 'object' && err !== null && 'code' in err;
  }
}

const errorSchema = z.object({
  code: z.nativeEnum(ErrorCode),
  message: z.string(),
  info: z.unknown(),
});
