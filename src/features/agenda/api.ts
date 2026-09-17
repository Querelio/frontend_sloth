import { ApiError, apiClient } from '../../lib/api'
import { isValidDateValue } from '../../lib/validation'
import type { Session } from '../sessions/types'

export function fetchAgendaSessions(): Promise<Session[]> {
  return apiClient<Session[]>('/agenda/sessions')
}

export function fetchAgendaSessionsByDate(date: string): Promise<Session[]> {
  if (!isValidDateValue(date)) {
    throw new ApiError(400, 'Invalid date')
  }

  const params = new URLSearchParams({ date })
  return apiClient<Session[]>(`/agenda/sessions/date?${params.toString()}`)
}
