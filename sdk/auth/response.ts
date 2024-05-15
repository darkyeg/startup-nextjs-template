/**
 * Represents the response body for authentication.
 */
export interface AuthResponse {
  /**
   * The access token for the authenticated user's session.
   */
  access_token: string;
  /**
   * Indicates whether the user's account is verified.
   */
  is_verified: boolean;
  /**
   * The refresh token used for refreshing the access token.
   */
  refresh_token: string;
}
