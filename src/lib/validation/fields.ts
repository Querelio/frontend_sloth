import { z } from 'zod'
import { isValidDateValue, isValidTimeValue } from './datetime'
import { FIELD_LIMITS, PASSWORD_MIN_LENGTH } from './limits'
import { isUnsafeText } from './sanitize'

const PERSON_NAME_PATTERN = /^[\p{L}][\p{L}\s'-]*$/u
const PHONE_PATTERN = /^\+?[1-9]\d{6,14}$/
const HEX_COLOR_PATTERN = /^#[0-9A-Fa-f]{6}$/
const CONTRACT_NUMBER_PATTERN = /^[A-Za-z0-9][A-Za-z0-9/_-]*$/

export interface UnsafeTextMessages {
  htmlNotAllowed: string
}

export interface RequiredTextMessages extends UnsafeTextMessages {
  required: string
  tooLong: string
}

export interface OptionalTextMessages extends UnsafeTextMessages {
  tooLong: string
}

export interface PersonNameMessages extends RequiredTextMessages {
  nameInvalid: string
}

export interface EmailMessages {
  required: string
  invalid: string
  tooLong: string
}

export interface PasswordMessages {
  required?: string
  min: string
  tooLong: string
}

export interface PhoneMessages {
  required: string
  invalid: string
  tooLong: string
}

export interface NumberFieldMessages {
  invalidNumber: string
  min?: string
  required?: string
}

export interface DateFieldMessages {
  required: string
  invalid: string
}

export interface TimeFieldMessages {
  required: string
  invalid: string
}

function hasMaxDecimalPlaces(value: number, places: number): boolean {
  if (!Number.isFinite(value)) {
    return false
  }

  const factor = 10 ** places
  return Math.abs(Math.round(value * factor) - value * factor) < 1e-6
}

export function textField(
  options:
    | { max: number; required: true; messages: RequiredTextMessages }
    | { max: number; required?: false; messages: OptionalTextMessages },
) {
  const schema = z
    .string()
    .trim()
    .max(options.max, options.messages.tooLong)
    .refine((value) => !isUnsafeText(value), options.messages.htmlNotAllowed)

  if (options.required) {
    return schema.min(1, options.messages.required)
  }

  return schema
}

export function personNameField(messages: PersonNameMessages) {
  return textField({
    max: FIELD_LIMITS.personName,
    required: true,
    messages,
  }).refine((value) => PERSON_NAME_PATTERN.test(value), messages.nameInvalid)
}

export function emailField(messages: EmailMessages) {
  return z
    .string()
    .trim()
    .min(1, messages.required)
    .max(FIELD_LIMITS.email, messages.tooLong)
    .email(messages.invalid)
}

export function passwordField(
  messages: PasswordMessages,
  options: { required: boolean } = { required: true },
) {
  const schema = z
    .string()
    .max(FIELD_LIMITS.password, messages.tooLong)
    .refine(
      (value) =>
        (!options.required && value.length === 0) ||
        value.length >= PASSWORD_MIN_LENGTH,
      messages.min,
    )

  if (options.required) {
    return schema.min(1, messages.required ?? messages.min)
  }

  return schema
}

export function phoneField(messages: PhoneMessages) {
  return z
    .string()
    .trim()
    .min(1, messages.required)
    .max(FIELD_LIMITS.phone, messages.tooLong)
    .refine((value) => {
      const compact = value.replace(/[\s().-]/g, '')
      return PHONE_PATTERN.test(compact)
    }, messages.invalid)
}

export function integerIdField(messages: NumberFieldMessages) {
  return z
    .int(messages.invalidNumber)
    .positive(messages.required ?? messages.invalidNumber)
}

export function optionalIntegerIdField(messages: NumberFieldMessages) {
  return integerIdField(messages).optional()
}

export function nonNegativeIntField(messages: NumberFieldMessages) {
  return z
    .int(messages.invalidNumber)
    .min(0, messages.min ?? messages.invalidNumber)
}

export function moneyField(messages: NumberFieldMessages) {
  return z
    .number(messages.invalidNumber)
    .min(0, messages.min ?? messages.invalidNumber)
    .refine((value) => hasMaxDecimalPlaces(value, 2), messages.invalidNumber)
}

export function dateField(messages: DateFieldMessages) {
  return z
    .string()
    .min(1, messages.required)
    .refine(isValidDateValue, messages.invalid)
}

export function timeField(messages: TimeFieldMessages) {
  return z
    .string()
    .min(1, messages.required)
    .refine(isValidTimeValue, messages.invalid)
}

export function hexColorField(invalidMessage: string) {
  return z.string().regex(HEX_COLOR_PATTERN, invalidMessage)
}

export function contractNumberField(
  messages: RequiredTextMessages & { invalid: string },
) {
  return textField({
    max: FIELD_LIMITS.contractNumber,
    required: true,
    messages,
  }).refine((value) => CONTRACT_NUMBER_PATTERN.test(value), messages.invalid)
}
