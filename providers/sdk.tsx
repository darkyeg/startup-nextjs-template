'use client';

import { createContext, useState } from 'react';
import type { FC, PropsWithChildren } from 'react';

import Sdk from '@/sdk';
import { Fetch } from '@/sdk/fetch';

export const SdkContext = createContext<Sdk>(null!);

const SdkProvider: FC<PropsWithChildren> = ({ children }) => {
  const [SDK] = useState(() => new Sdk(new Fetch()));

  return <SdkContext.Provider value={SDK}>{children}</SdkContext.Provider>;
};

export default SdkProvider;
