/**
 * UserEntity, Represents a user entity.
 */
export interface IUser {
  /**
   * The first name of the user.
   */
  first_name: string;
  /**
   * The unique identifier of the user.
   */
  id: string;
  /**
   * The profile image of the user.
   */
  image?: null | string;
  /**
   * The last name of the user.
   */
  last_name: string;
}

/**
 * ProfileEntity, Represents a profile entity.
 *
 * UserEntity, Represents a user entity.
 */
export interface IProfile extends IUser {
  /**
   * The email address of the user.
   */
  email: string;
  /**
   * The phone number of the user.
   */
  phone: string;
}
