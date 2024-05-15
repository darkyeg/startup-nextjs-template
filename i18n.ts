import { getRequestConfig } from 'next-intl/server';

import { availableLocaleCodes } from '@/next.locales';

// Loads the Application Locales/Translations Dynamically
const loadLocaleDictionary = async (locale: string) => {
  // This enables HMR on the English and Arabic Locale, so that instant refresh
  // happens while we add/change texts on the source locale
  if (locale === 'en') {
    return import('./i18n/locales/en.json').then(f => f.default);
  } else if (locale == 'ar') {
    return import('./i18n/locales/ar.json').then(f => f.default);
  }

  if (availableLocaleCodes.includes(locale)) {
    // Other languages don't really require HMR as they will never be development languages
    // so we can load them dynamically
    return import(`./i18n/locales/${locale}.json`).then(f => f.default);
  }

  throw new Error(`Unsupported locale: ${locale}`);
};

// Provides `next-intl` configuration for RSC/SSR
export default getRequestConfig(async ({ locale }) => ({
  // This is the dictionary of messages to be loaded
  messages: await loadLocaleDictionary(locale),
  timeZone: 'Asia/Riyadh',
}));
