import { getLocale } from 'next-intl/server';
import { type FC, type PropsWithChildren } from 'react';

import Notification from '@/components/Common/Notification';
import BaseLayout from '@/layouts/Base';
import { availableLocalesMap, defaultLocale } from '@/next.locales';
import AllProviders from '@/providers/all';
import { LocaleProvider } from '@/providers/locale';

import '@/styles/index.css';

const RootLayout: FC<PropsWithChildren> = async ({ children }) => {
  const locale = await getLocale();

  const { langDir, hrefLang } = availableLocalesMap[locale] || defaultLocale;

  return (
    <html dir={langDir} lang={hrefLang}>
      <AllProviders dir={langDir}>
        <LocaleProvider>
          <body suppressHydrationWarning>
            <Notification />
            <BaseLayout>{children}</BaseLayout>
          </body>
        </LocaleProvider>
      </AllProviders>
    </html>
  );
};

export default RootLayout;
