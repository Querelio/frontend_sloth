import type { TFunction } from 'i18next'
import { z } from 'zod'
import {
  FIELD_LIMITS,
  integerIdField,
  nonNegativeIntField,
  textField,
} from '../../lib/validation'

function baseClassFormFields(t: TFunction<'classes'>) {
  const textMessages = {
    tooLong: t('validation.tooLong'),
    htmlNotAllowed: t('validation.htmlNotAllowed'),
  }

  return {
    institutionId: integerIdField({
      invalidNumber: t('validation.invalidNumber'),
      required: t('validation.institutionRequired'),
    }),
    classLevel: textField({
      max: FIELD_LIMITS.classLevel,
      required: true,
      messages: {
        ...textMessages,
        required: t('validation.classLevelRequired'),
      },
    }),
    studentCount: nonNegativeIntField({
      invalidNumber: t('validation.studentCountInvalid'),
      min: t('validation.studentCountMin'),
    }),
    name: textField({
      max: FIELD_LIMITS.name,
      required: true,
      messages: {
        ...textMessages,
        required: t('validation.nameRequired'),
      },
    }),
  }
}

export function createClassFormSchema(t: TFunction<'classes'>) {
  return z.object(baseClassFormFields(t))
}

export function editClassFormSchema(t: TFunction<'classes'>) {
  return z.object(baseClassFormFields(t))
}

export type CreateClassFormValues = z.infer<
  ReturnType<typeof createClassFormSchema>
>
export type EditClassFormValues = z.infer<ReturnType<typeof editClassFormSchema>>
export type ClassFormValues = EditClassFormValues
