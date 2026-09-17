function resolveApiUrl(): string {
  const apiUrl = import.meta.env.API_URL
  if (typeof apiUrl !== 'string' || apiUrl.length === 0) {
    throw new Error('API_URL is required. Set it in .env')
  }

  return apiUrl.replace(/\/$/, '')
}

export const env = {
  apiUrl: resolveApiUrl(),
} as const
