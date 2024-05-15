import { createSharedPathnamesNavigation } from 'next-intl/navigation';

import { availableLocaleCodes } from './next.locales';

export const { Link, redirect, usePathname, useRouter } =
  createSharedPathnamesNavigation({
    locales: availableLocaleCodes,
    localePrefix: 'as-needed',
  });
