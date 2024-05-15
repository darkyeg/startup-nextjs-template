import { useEffect } from 'react';
import useSWR from 'swr';

import RootStore from '@/stores/RootStore';

import useSDK from './useSDK';

// Define keys for useSWR
export const PROFILE_KEY = 'get_profile';

/**
 * Custom hook for initializing data fetching.
 * @returns An object containing loading state, error state, and fetched data.
 */
export const useInitFetch = () => {
  const SDK = useSDK();

  // Fetch user profile data using SWR
  const { data: profile, isLoading: profileIsLoading } = useSWR(
    PROFILE_KEY,
    async () => SDK.user.me()
  );

  // Set user profile data to UserStore when fetched
  useEffect(() => {
    if (!profile) return;
    RootStore.user.setUser(profile);
  }, [profile]);

  // Return loading state, error state, and fetched data
  return {
    isLoading: profileIsLoading,
    isPanicError: false, // Placeholder for panic error state
    profile,
  };
};
