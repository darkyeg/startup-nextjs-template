import type { Result } from '@sapphire/result';
import { makeAutoObservable } from 'mobx';

import type { RequestError } from '@/sdk/fetch';
import { Fetch } from '@/sdk/fetch';
import type { MeError } from '@/sdk/user';
import type { IProfile, UnauthorizedError, UnknownError } from '@/types';
import { ErrorCode } from '@/types';

import type RootStore from './RootStore';

/**
 * Enumeration representing the status of the user.
 */
export enum UserStatus {
  /**
   * User status not yet determined.
   */
  NotReady,
  /**
   * User is ready and authenticated.
   */
  Ready,
  /**
   * User is not verified.
   */
  NotVerified,
  /**
   * Error occurred while fetching user data.
   */
  Error,
  /**
   * User is not logged in.
   */
  NotLoggedIn,
}

/**
 * Represents the store for managing user-related data and status.
 * @template Ready - A boolean value indicating whether the user data is ready.
 */
export class UserStore<Ready extends boolean = boolean> {
  /**
   * The profile information of the user.
   */
  profile: Ready extends true ? IProfile : IProfile | null = null!;
  /**
   * The error that occurred during user data fetching.
   */
  error: RequestError<MeError | UnknownError> | null = null;
  /**
   * The current status of the user.
   */
  // @ts-expect-error Type inference is not accurate for conditional types
  status: Ready extends true ? UserStatus.Ready : UserStatus =
    UserStatus.NotReady;

  /**
   * Constructs an instance of the UserStore.
   * @param  store - The root store instance.
   */
  constructor(public store: RootStore) {
    makeAutoObservable(this);
  }

  /**
   * Checks if the user data is ready.
   * @returns true if the user data is ready, otherwise false.
   */
  isReady(): this is UserStore<true> {
    return this.status == UserStatus.Ready;
  }

  /**
   * Sets the user data and updates the status accordingly.
   * @param  result - The result of fetching user data.
   */
  setUser(result: Result<IProfile, RequestError<UnauthorizedError>>) {
    if (result.isOk()) {
      this.profile = result.unwrap();
      this.status = UserStatus.Ready;
      return;
    }

    const err = result.unwrapErr();

    this.error = err;
    // @ts-expect-error Type inference is not accurate for conditional types
    this.status =
      Fetch.isCodeErrorUnsafe(err) && err.code == ErrorCode.NotVerified
        ? UserStatus.NotVerified
        : UserStatus.Error;
  }

  /**
   * Sets the status of the user.
   * @param status - The status to set.
   */
  protected setStatus(status: UserStatus) {
    // @ts-expect-error Type inference is not accurate for conditional types
    this.status = status;
  }
}
