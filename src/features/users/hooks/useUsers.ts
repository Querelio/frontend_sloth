import { useQuery } from '@tanstack/react-query'
import { queryKeys } from '../../../lib/queryKeys'
import { fetchUsers } from '../api'

interface UseUsersOptions {
  enabled?: boolean
}

export function useUsers({ enabled = true }: UseUsersOptions = {}) {
  return useQuery({
    queryKey: queryKeys.users.lists(),
    queryFn: fetchUsers,
    enabled,
  })
}
