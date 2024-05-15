import { useContext } from 'react';

import { SdkContext } from '@/providers/sdk';

const useSDK = () => useContext(SdkContext);
export default useSDK;
