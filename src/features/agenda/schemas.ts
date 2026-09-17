import type { TFunction } from 'i18next'
import { z } from 'zod'
import {
  dateField,
  FIELD_LIMITS,
  isValidTimeValue,
  textField,
  timeField,
} from '../../lib/validation'

export function createQuickSessionSchema(t: TFunction<'agenda'>) {
  const textMessages = {
    tooLong: t('validation.tooLong'),
    htmlNotAllowed: t('validation.htmlNotAllowed'),
  }

  return z
    .object({
      title: textField({
        max: FIELD_LIMITS.title,
        required: true,
        messages: {
          ...textMessages,
          required: t('validation.titleRequired'),
        },
      }),
      date: dateField({
        required: t('validation.dateRequired'),
        invalid: t('validation.dateInvalid'),
      }),
      start: timeField({
        required: t('validation.startRequired'),
        invalid: t('validation.startInvalid'),
      }),
      end: timeField({
        required: t('validation.endRequired'),
        invalid: t('validation.endInvalid'),
      }),
    })
    .refine(
      (values) =>
        !isValidTimeValue(values.start) ||
        !isValidTimeValue(values.end) ||
        values.end > values.start,
      {
        message: t('validation.endAfterStart'),
        path: ['end'],
      },
    )
}

export type QuickSessionFormValues = z.infer<
  ReturnType<typeof createQuickSessionSchema>
>
