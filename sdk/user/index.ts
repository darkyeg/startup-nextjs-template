import ApiGroup from '@/sdk/group';
import type { IProfile, UnauthorizedError } from '@/types';

/**
 * Represents an error that can occur when fetching user profile information.
 */
export type MeError = UnauthorizedError;

/**
 * Class containing methods for user-related API requests.
 */
class User extends ApiGroup {
  /**
   * Retrieves the profile information of the currently authenticated user.
   * @returns A Promise that resolves with the user profile or an error.
   */
  async me() {
    return this.get<IProfile, MeError>('/users/account');
  }
}

export default User;
