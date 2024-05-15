import { Fetch } from '@/sdk/fetch';
import type { RequestError } from '@/sdk/fetch';
import { ErrorCode } from '@/types';

import Auth from './auth';
import User from './user';

// Define the error codes that will be handled by the Sdk class
const HANDLE_ERROR_CODES = [ErrorCode.NotVerified];

/**
 * Represents the SDK class that handles API requests and error handling.
 */
class Sdk {
  /**
   * Instance of the Auth class for authentication-related operations.
   */
  auth = new Auth(this);

  /**
   * Instance of the User class for user-related operations.
   */
  user = new User(this);

  fetch = new Fetch({
    withCredentials: true,
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  });

  /**
   * Constructs an instance of the SDK.
   * @param fetch - The Fetch instance used for making HTTP requests.
   */
  constructor() {
    this.fetch.setErrorMiddleware(this.handleError.bind(this));
  }

  /**
   * Handles API request errors by checking the error code and performing appropriate actions.
   * @param error - The error object containing the error code and message.
   */
  protected handleError(error: RequestError) {
    if (
      !Fetch.isCodeErrorUnsafe(error) ||
      !HANDLE_ERROR_CODES.includes(error.code)
    )
      return;

    switch (error.code) {
      case ErrorCode.NotVerified:
        // TODO(Youssef Khalil): Add handling logic for ErrorCode.NotVerified error code here
        break;
      default:
        return;
    }

    return;
  }
}

export default Sdk;
