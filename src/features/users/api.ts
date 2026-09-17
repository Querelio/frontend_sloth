import { apiClient, resourcePath } from '../../lib/api'
import type { UpdateUserRequest, User } from './types'

export function fetchUsers(): Promise<User[]> {
  return apiClient<User[]>('/users')
}

export function fetchUser(id: number): Promise<User> {
  return apiClient<User>(resourcePath('/users', id))
}

export function updateUser(
  id: number,
  data: UpdateUserRequest,
): Promise<User> {
  return apiClient<User>(resourcePath('/users', id), {
    method: 'PATCH',
    body: JSON.stringify(data),
  })
}
