import { apiClient, resourcePath } from '../../lib/api'
import type {
  CreateInstitutionRequest,
  Institution,
  UpdateInstitutionRequest,
} from './types'

export function fetchInstitutions(): Promise<Institution[]> {
  return apiClient<Institution[]>('/institutions')
}

export function fetchInstitution(id: number): Promise<Institution> {
  return apiClient<Institution>(resourcePath('/institutions', id))
}

export function createInstitution(
  data: CreateInstitutionRequest,
): Promise<Institution> {
  return apiClient<Institution>('/institutions', {
    method: 'POST',
    body: JSON.stringify(data),
  })
}

export function updateInstitution(
  id: number,
  data: UpdateInstitutionRequest,
): Promise<Institution> {
  return apiClient<Institution>(resourcePath('/institutions', id), {
    method: 'PATCH',
    body: JSON.stringify(data),
  })
}

export function deleteInstitution(id: number): Promise<void> {
  return apiClient<void>(resourcePath('/institutions', id), {
    method: 'DELETE',
  })
}
