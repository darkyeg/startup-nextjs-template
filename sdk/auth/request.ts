/**
 * Represents the request body for user registration.
 */
export interface RegisterRequest {
  /**
   * The email address of the user.
   */
  email: string;
  /**
   * The first name of the user.
   */
  first_name: string;
  /**
   * The last name of the user.
   */
  last_name: string;
  /**
   * The password for the user's account.
   */
  password: string;
}

/**
 * Represents the request body for user login.
 */
export interface LoginRequest {
  /**
   * The email address of the user.
   */
  email: string;
  /**
   * The password for the user's account.
   */
  password: string;
}
