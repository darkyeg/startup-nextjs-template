import { StringLanguage } from './types';

declare module 'next-intl' {
  function useLocale(): keyof StringLanguage;
}
