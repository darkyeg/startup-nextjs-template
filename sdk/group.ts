import type { AxiosRequestConfig } from 'axios';

import type { RequestResult } from '@/sdk/fetch';
import type { CodeError } from '@/types';

import type Sdk from '.';

/**
 * Represents a group of API endpoints with common functionality.
 */
class ApiGroup {
  /**
   * Constructs an instance of ApiGroup.
   * @param {Sdk} sdk - The SDK instance.
   */
  constructor(protected sdk: Sdk) {}

  protected async get<
    T = unknown,
    E extends CodeError = CodeError,
    D = unknown,
  >(url: string, config?: AxiosRequestConfig<D>): Promise<RequestResult<T, E>> {
    return (await this.sdk.fetch.get<T, E>(url, config)).map(r => r.data);
  }

  protected async post<
    T = unknown,
    E extends CodeError = CodeError,
    D = unknown,
  >(
    url: string,
    data?: D,
    config?: AxiosRequestConfig<D>
  ): Promise<RequestResult<T, E>> {
    return (await this.sdk.fetch.post<T, E>(url, data, config)).map(
      r => r.data
    );
  }

  protected async patch<
    T = unknown,
    E extends CodeError = CodeError,
    D = unknown,
  >(
    url: string,
    data?: D,
    config?: AxiosRequestConfig<D>
  ): Promise<RequestResult<T, E>> {
    return (await this.sdk.fetch.patch<T, E>(url, data, config)).map(
      r => r.data
    );
  }

  protected async delete<
    T = unknown,
    E extends CodeError = CodeError,
    D = unknown,
  >(url: string, config?: AxiosRequestConfig<D>): Promise<RequestResult<T, E>> {
    return (await this.sdk.fetch.delete<T, E>(url, config)).map(r => r.data);
  }
}

export default ApiGroup;
