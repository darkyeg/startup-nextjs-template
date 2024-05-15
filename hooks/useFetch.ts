import { useMemo } from 'react';

import { Fetch } from '@/sdk/fetch';

const useFetch = () => useMemo(() => new Fetch(), []);

export default useFetch;
