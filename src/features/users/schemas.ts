import type { TFunction } from 'i18next'
import { z } from 'zod'
import {
  emailField,
  passwordField,
  personNameField,
} from '../../lib/validation'

export function createProfileFormSchema(t: TFunction<'profile'>) {
  return z
    .object({
      firstName: personNameField({
        required: t('validation.firstNameRequired'),
        tooLong: t('validation.tooLong'),
        htmlNotAllowed: t('validation.htmlNotAllowed'),
        nameInvalid: t('validation.nameInvalid'),
      }),
      lastName: personNameField({
        required: t('validation.lastNameRequired'),
        tooLong: t('validation.tooLong'),
        htmlNotAllowed: t('validation.htmlNotAllowed'),
        nameInvalid: t('validation.nameInvalid'),
      }),
      email: emailField({
        required: t('validation.emailRequired'),
        invalid: t('validation.emailInvalid'),
        tooLong: t('validation.tooLong'),
      }),
      password: passwordField(
        {
          min: t('validation.passwordMin'),
          tooLong: t('validation.passwordTooLong'),
        },
        { required: false },
      ),
      confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: t('validation.passwordMismatch'),
      path: ['confirmPassword'],
    })
}

export type ProfileFormValues = z.infer<
  ReturnType<typeof createProfileFormSchema>
>
