'use client';

import { DirectionProvider, type Direction } from '@radix-ui/react-direction';
import type { FC, PropsWithChildren } from 'react';

import SdkProvider from './sdk';
import StoreFetchProvider from './store';
import ZodProvider from './zod';

interface AllProvidersProps extends PropsWithChildren {
  dir: Direction;
}

const AllProviders: FC<AllProvidersProps> = ({ children, dir }) => (
  <DirectionProvider dir={dir}>
    <SdkProvider>
      <StoreFetchProvider>
        <ZodProvider>{children}</ZodProvider>
      </StoreFetchProvider>
    </SdkProvider>
  </DirectionProvider>
);

export default AllProviders;
