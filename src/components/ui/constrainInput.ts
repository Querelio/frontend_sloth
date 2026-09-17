import type { InputHTMLAttributes } from 'react'

function nextInputValue(input: HTMLInputElement, inserted: string): string {
  const start = input.selectionStart ?? input.value.length
  const end = input.selectionEnd ?? input.value.length
  return `${input.value.slice(0, start)}${inserted}${input.value.slice(end)}`
}

function allowsDecimal(
  step: string | number | undefined,
): boolean {
  if (step === 'any') {
    return true
  }

  if (typeof step === 'number') {
    return !Number.isInteger(step)
  }

  if (typeof step === 'string' && step !== '') {
    const parsed = Number(step)
    return Number.isFinite(parsed) && !Number.isInteger(parsed)
  }

  return false
}

function isValidPartialNumber(
  value: string,
  allowDecimal: boolean,
  allowNegative: boolean,
): boolean {
  if (value === '' || (allowNegative && value === '-')) {
    return true
  }

  if (/[eE]/.test(value)) {
    return false
  }

  const pattern = allowNegative
    ? allowDecimal
      ? /^-?\d*\.?\d*$/
      : /^-?\d*$/
    : allowDecimal
      ? /^\d*\.?\d*$/
      : /^\d*$/

  return pattern.test(value)
}

export function isTypedInputAllowed(
  input: HTMLInputElement,
  inserted: string,
  type: string | undefined,
  step: string | number | undefined,
  min: string | number | undefined,
): boolean {
  const nextValue = nextInputValue(input, inserted)

  if (type === 'number') {
    const allowNegative =
      min === undefined || min === '' || Number(min) < 0
    return isValidPartialNumber(nextValue, allowsDecimal(step), allowNegative)
  }

  if (type === 'tel') {
    return /^[0-9+()\s-]*$/.test(inserted)
  }

  if (type === 'email') {
    return !/\s/.test(inserted)
  }

  return true
}

export function resolveInputMode(
  type: string | undefined,
  step: string | number | undefined,
  current?: InputHTMLAttributes<HTMLInputElement>['inputMode'],
): InputHTMLAttributes<HTMLInputElement>['inputMode'] {
  if (current) {
    return current
  }

  if (type === 'email') {
    return 'email'
  }

  if (type === 'tel') {
    return 'tel'
  }

  if (type === 'search') {
    return 'search'
  }

  if (type === 'number') {
    return allowsDecimal(step) ? 'decimal' : 'numeric'
  }

  return undefined
}
