import type {
  InputEvent as ReactInputEvent,
  InputHTMLAttributes,
  KeyboardEvent,
} from 'react'
import {
  isTypedInputAllowed,
  resolveInputMode,
} from './constrainInput'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
}

export function Input({
  label,
  error,
  id,
  className = '',
  type,
  step,
  min,
  inputMode,
  onBeforeInput,
  onKeyDown,
  ...props
}: InputProps) {
  const inputId = id ?? props.name
  const resolvedInputMode = resolveInputMode(type, step, inputMode)

  const handleBeforeInput = (event: ReactInputEvent<HTMLInputElement>) => {
    const nativeEvent = event.nativeEvent as InputEvent
    const inserted = nativeEvent.data

    if (
      inserted !== null &&
      !isTypedInputAllowed(event.currentTarget, inserted, type, step, min)
    ) {
      event.preventDefault()
      return
    }

    onBeforeInput?.(event)
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (type === 'number' && ['e', 'E', '+'].includes(event.key)) {
      event.preventDefault()
      return
    }

    if (
      type === 'number' &&
      event.key === '-' &&
      (min === undefined || min === '' || Number(min) >= 0)
    ) {
      event.preventDefault()
      return
    }

    onKeyDown?.(event)
  }

  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={inputId}
        className="text-sm uppercase tracking-wide text-muted"
      >
        {label}
      </label>
      <input
        {...props}
        id={inputId}
        type={type}
        step={step}
        min={min}
        inputMode={resolvedInputMode}
        onBeforeInput={handleBeforeInput}
        onKeyDown={handleKeyDown}
        className={`w-full rounded-xl border border-border bg-background px-3 py-2.5 text-foreground placeholder:text-disabled focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary ${error ? 'border-danger focus:border-danger focus:ring-danger' : ''} ${className}`}
      />
      {error ? <p className="text-sm text-danger">{error}</p> : null}
    </div>
  )
}

