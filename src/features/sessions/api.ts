import { apiClient, resourcePath } from '../../lib/api'
import type {
  CreateSessionRequest,
  Session,
  UpdateSessionRequest,
} from './types'

export function fetchSessions(): Promise<Session[]> {
  return apiClient<Session[]>('/sessions')
}

export function fetchSession(id: number): Promise<Session> {
  return apiClient<Session>(resourcePath('/sessions', id))
}

export function createSession(data: CreateSessionRequest): Promise<Session> {
  return apiClient<Session>('/sessions', {
    method: 'POST',
    body: JSON.stringify(data),
  })
}

export function updateSession(
  id: number,
  data: UpdateSessionRequest,
): Promise<Session> {
  return apiClient<Session>(resourcePath('/sessions', id), {
    method: 'PATCH',
    body: JSON.stringify(data),
  })
}

export function deleteSession(id: number): Promise<void> {
  return apiClient<void>(resourcePath('/sessions', id), {
    method: 'DELETE',
  })
}
