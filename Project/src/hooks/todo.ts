import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

export interface Todo {
  id: string
  order: number
  title: string
  done: boolean
  createdAt: string
  updatedAt: string
}

export const userFetchTodos = () => {
  return useQuery({
    queryKey: ['todos'],
    queryFn: async () => {
      const res = await (
        await fetch(
          'https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos',
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              apikey: 'KDT8_bcAWVpD8',
              username: 'KDTB_SEO'
            }
          }
        )
      ).json()
      console.log('Resp:', res)
      return res
      // const data = await res.json()
      // console.log('Resp:', data)

      // const data = await res.json()
      // return data
      //return (await fetch('')).json() //같음
    }
  })
}

export function useCreateTodo() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (title: string) => {
      const res = await (
        await fetch(
          'https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              apikey: 'KDT8_bcAWVpD8',
              username: 'KDTB_SEO'
            },
            body: JSON.stringify({
              title
            })
          }
        )
      ).json()
      return res.json() as Promise<Todo>
    },
    onSuccess: todo => {
      //배열.unshift(데이터)
      const todos = queryClient.getQueryData(['todos']) as Todo[]
      //todos.unshift(todo)
      queryClient.setQueriesData(['todos'], [todo, ...todos])
    }
  })
}
