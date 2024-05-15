import { z } from 'zod';

export const stringLangSchema = (min: number = 0, max: number = Infinity) =>
  z.object({
    ar: z.string().min(min).max(max).trim(),
    en: z.string().min(min).max(max).trim(),
  });
