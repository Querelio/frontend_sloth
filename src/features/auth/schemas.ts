import type { TFunction } from 'i18next'
import { z } from 'zod'
import {
  emailField,
  passwordField,
  personNameField,
} from '../../lib/validation'

function personNameMessages(t: TFunction<'auth'>) {
  return {
    required: t('validation.firstNameRequired'),
    tooLong: t('validation.tooLong'),
    htmlNotAllowed: t('validation.htmlNotAllowed'),
    nameInvalid: t('validation.nameInvalid'),
  }
}

export function createLoginSchema(t: TFunction<'auth'>) {
  return z.object({
    email: emailField({
      required: t('validation.emailRequired'),
      invalid: t('validation.emailInvalid'),
      tooLong: t('validation.tooLong'),
    }),
    password: passwordField({
      required: t('validation.passwordRequired'),
      min: t('validation.passwordMin'),
      tooLong: t('validation.passwordTooLong'),
    }),
  })
}

export function createRegisterSchema(t: TFunction<'auth'>) {
  return z
    .object({
      firstName: personNameField({
        ...personNameMessages(t),
        required: t('validation.firstNameRequired'),
      }),
      lastName: personNameField({
        ...personNameMessages(t),
        required: t('validation.lastNameRequired'),
      }),
      email: emailField({
        required: t('validation.emailRequired'),
        invalid: t('validation.emailInvalid'),
        tooLong: t('validation.tooLong'),
      }),
      password: passwordField({
        required: t('validation.passwordRequired'),
        min: t('validation.passwordMin'),
        tooLong: t('validation.passwordTooLong'),
      }),
      confirmPassword: z
        .string()
        .min(1, t('validation.confirmPasswordRequired')),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: t('validation.passwordMismatch'),
      path: ['confirmPassword'],
    })
}

export type LoginFormValues = z.infer<ReturnType<typeof createLoginSchema>>
export type RegisterFormValues = z.infer<ReturnType<typeof createRegisterSchema>>
