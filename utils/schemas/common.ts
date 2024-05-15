import { z } from 'zod';

import { UpdateImageIdKind } from '@/types';

export const stringLangSchema = (min: number = 0, max: number = Infinity) =>
  z.object({
    ar: z.string().min(min).max(max).trim(),
    en: z.string().min(min).max(max).trim(),
  });

export const updateImageSchema = z.object({
  id: z.string(),
  id_kind: z.nativeEnum(UpdateImageIdKind),
  uploading: z.boolean().optional(),
  blobUrl: z.string().optional(),
});

export type UpdateImageSchema = z.infer<typeof updateImageSchema>;

export const updateImageLangSchema = z.object({
  ar: updateImageSchema,
  en: updateImageSchema,
});

export type UpdateImageLangSchema = z.infer<typeof updateImageLangSchema>;
