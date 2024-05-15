import ApiGroup from '@/sdk/group';
import type { CodeError, ErrorCode, UniqueError } from '@/types';

import type { RegisterRequest, LoginRequest } from './request';
import type { AuthResponse } from './response';

/**
 * Represents an error that can occur during the registration process.
 */
export type RegisterError = UniqueError<'email' | 'phone'>;

/**
 * Represents an error that can occur during the login process.
 */
export type LoginError =
  | CodeError<ErrorCode.InvalidEmailOrPassword>
  | CodeError<ErrorCode.NotVerified>;

/**
 * Class containing methods for authentication-related API requests.
 */
class Auth extends ApiGroup {
  /**
   * Registers a new user.
   * @param body - The registration request body.
   * @returns A Promise that resolves with the authentication response or an error.
   */
  async register(body: RegisterRequest) {
    return await this.post<AuthResponse, RegisterError>('/auth/register', body);
  }

  /**
   * Logs in a user.
   * @param body - The login request body.
   * @returns A Promise that resolves with the authentication response or an error.
   */
  async login(body: LoginRequest) {
    return await this.post<AuthResponse, LoginError>('/auth/login', body);
  }
}

export * from './request';

export default Auth;
