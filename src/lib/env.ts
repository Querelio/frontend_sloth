const DEFAULT_API_URL = 'http://localhost:3000'

function resolveApiUrl(): string {
  const apiUrl = import.meta.env.VITE_API_URL
  if (typeof apiUrl !== 'string' || apiUrl.length === 0) {
    return DEFAULT_API_URL
  }

  return apiUrl.replace(/\/$/, '')
}

export const env = {
  apiUrl: resolveApiUrl(),
} as const
