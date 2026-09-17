const HTML_TAG_PATTERN = /<[^>]*>/

export function containsHtml(value: string): boolean {
  return HTML_TAG_PATTERN.test(value)
}

function isControlCharCode(code: number): boolean {
  return (
    (code >= 0 && code <= 8) ||
    code === 11 ||
    code === 12 ||
    (code >= 14 && code <= 31) ||
    code === 127
  )
}

export function containsControlChars(value: string): boolean {
  for (const character of value) {
    if (isControlCharCode(character.charCodeAt(0))) {
      return true
    }
  }

  return false
}

export function isUnsafeText(value: string): boolean {
  return containsHtml(value) || containsControlChars(value)
}
