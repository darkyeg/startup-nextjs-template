'use client';

import { useTranslations } from 'next-intl';
import type { FC } from 'react';

import { Button } from '@/components/Common/Button';

const Home: FC = () => {
  const t = useTranslations();

  return (
    <main className="col-span-full row-span-full flex flex-col items-center justify-center gap-2">
      <h1 className="text-2xl">{t('pages.home.hi')}</h1>
      <Button onClick={() => alert(t('pages.home.bruh'))}>
        {t('pages.home.dont-click-me')}
      </Button>
    </main>
  );
};

export default Home;
