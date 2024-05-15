'use client';

import { createContext, useEffect, useState } from 'react';
import type { FC, PropsWithChildren } from 'react';

import { useInitFetch } from '@/hooks/useInitFetch';
import RootStore from '@/stores/RootStore';

export const StoreContext = createContext(RootStore);

const StoreFetchProvider: FC<PropsWithChildren> = ({ children }) => {
  const [isLoading, setLoading] = useState(true);

  const { isLoading: isStoreLoading } = useInitFetch();

  useEffect(() => setLoading(isStoreLoading), [isStoreLoading]);

  return (
    <StoreContext.Provider value={RootStore}>
      {isLoading ? '...Loading' : children}
    </StoreContext.Provider>
  );
};

const StoreProvider: FC<PropsWithChildren> = ({ children }) => {
  if (process.env.NEXT_PUBLIC_DISABLE_BACKEND_INIT_FETCH == 'true')
    return (
      <StoreContext.Provider value={RootStore}>
        {children}
      </StoreContext.Provider>
    );

  return <StoreFetchProvider>{children}</StoreFetchProvider>;
};

export default StoreProvider;
