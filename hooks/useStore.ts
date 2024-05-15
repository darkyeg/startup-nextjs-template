'use client';

import { useContext } from 'react';

import { StoreContext } from '@/providers/store';

const useStore = () => useContext(StoreContext);

export default useStore;
