/**
 * @type {import("../types/index").LocaleConfig[]}
 */
const localeConfig = [
  {
    code: 'ar',
    localName: 'العربية',
    name: 'Arabic',
    langDir: 'rtl',
    dateFormat: 'YYYY.MM.DD',
    hrefLang: 'ar',
    enabled: true,
    default: true,
  },
  {
    code: 'en',
    localName: 'English',
    name: 'English',
    langDir: 'ltr',
    dateFormat: 'MM.DD.YYYY',
    hrefLang: 'en-GB',
    enabled: true,
    default: false,
  },
];

export default localeConfig;
