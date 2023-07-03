import { AxiosResponse } from "axios"
import { useQuery, UseQueryOptions, UseQueryResult } from "react-query"

import { api } from "../axios"

type User = {
  id: string
  name: string
  email: string
  created_at: string
}

type GetUsersResponse = {
  totalCount: number
  users: User[]
}

export async function getUsers(page: number): Promise<GetUsersResponse> {
  const { data, headers } = await api.get<User[]>('users', {
    params: {
      page,
    }
  })

  const totalCount = Number( headers['x-total-count'] )

  const users = data.map(user => ({
    id: user.id,
    name: user.name,
    email: user.email,
    created_at: new Date(user.created_at).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    })
  }))

  return {
    users,
    totalCount,
  }
}

export function useUsers(page: number /*, options: UseQueryOptions */) {
  return useQuery(['users', page], () => getUsers(page), {
    staleTime: 1000 * 60 * 10,   // 10 minutes
    // ...options,
  }) // as UseQueryResult<GetUsersResponse, unknown>
}