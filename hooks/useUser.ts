import type { UserStore } from '@/stores/UserStore';

import useStore from './useStore';

const useUser = <Ready extends boolean = true>(): UserStore<Ready> => {
  const store = useStore();

  return store.user;
};

export default useUser;
