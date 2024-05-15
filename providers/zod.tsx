'use client';

import { init } from 'i18next';
import { useLocale } from 'next-intl';
import type { FC, PropsWithChildren } from 'react';
import { z } from 'zod';
import { zodI18nMap } from 'zod-i18n-map';
import translationAr from 'zod-i18n-map/locales/ar/zod.json';
import translationEn from 'zod-i18n-map/locales/en/zod.json';

const ZodProvider: FC<PropsWithChildren> = ({ children }) => {
  const locale = useLocale();

  init({
    lng: locale,
    resources: {
      en: { zod: translationEn },
      ar: { zod: translationAr },
    },
  });
  z.setErrorMap(zodI18nMap);

  return <>{children}</>;
};

export default ZodProvider;
