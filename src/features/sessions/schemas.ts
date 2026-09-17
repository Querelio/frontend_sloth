import type { TFunction } from 'i18next'
import { z } from 'zod'
import {
  dateField,
  FIELD_LIMITS,
  isValidTimeValue,
  optionalIntegerIdField,
  textField,
  timeField,
} from '../../lib/validation'

function sessionTextMessages(t: TFunction<'sessions'>) {
  return {
    tooLong: t('validation.tooLong'),
    htmlNotAllowed: t('validation.htmlNotAllowed'),
  }
}

export function createSessionFormSchema(t: TFunction<'sessions'>) {
  const textMessages = sessionTextMessages(t)

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
      subject: textField({
        max: FIELD_LIMITS.subject,
        messages: textMessages,
      }),
      classId: optionalIntegerIdField({
        invalidNumber: t('validation.invalidNumber'),
      }),
      contractId: optionalIntegerIdField({
        invalidNumber: t('validation.invalidNumber'),
      }),
      declarationReference: textField({
        max: FIELD_LIMITS.declarationReference,
        messages: textMessages,
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

export type SessionFormValues = z.infer<ReturnType<typeof createSessionFormSchema>>
