import type { Direction } from '@radix-ui/react-direction';
import type { JSXElementConstructor, ReactElement, ReactNode } from 'react';

export interface LocaleConfig {
  code: string;
  localName: string;
  name: string;
  langDir: Direction;
  dateFormat: string;
  hrefLang: string;
  enabled: boolean;
}

export type FormattedMessage =
  | string
  | ReactElement<HTMLElement, string | JSXElementConstructor<HTMLElement>>
  | ReadonlyArray<ReactNode>;

/**
 * StringLanguage, A struct representing localized strings for different languages.
 */
export interface StringLanguage {
  /**
   * Arabic language.
   */
  ar: string;
  /**
   * English language.
   */
  en: string;
}

/**
 * StringLanguage, A struct representing localized strings for different languages.
 */
export interface OptionalStringLanguage {
  /**
   * Arabic language.
   */
  ar: string | null;
  /**
   * English language.
   */
  en: string | null;
}
