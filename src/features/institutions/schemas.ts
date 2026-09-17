import type { TFunction } from 'i18next'
import { z } from 'zod'
import {
  FIELD_LIMITS,
  hexColorField,
  textField,
} from '../../lib/validation'

export function createInstitutionFormSchema(t: TFunction<'institutions'>) {
  const textMessages = {
    tooLong: t('validation.tooLong'),
    htmlNotAllowed: t('validation.htmlNotAllowed'),
  }

  return z.object({
    name: textField({
      max: FIELD_LIMITS.name,
      required: true,
      messages: {
        ...textMessages,
        required: t('validation.nameRequired'),
      },
    }),
    address: textField({
      max: FIELD_LIMITS.address,
      required: true,
      messages: {
        ...textMessages,
        required: t('validation.addressRequired'),
      },
    }),
    color: hexColorField(t('validation.colorInvalid')),
    requiresDeclaration: z.boolean(),
  })
}

export type InstitutionFormValues = z.infer<
  ReturnType<typeof createInstitutionFormSchema>
>
