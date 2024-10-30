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
              username: 'KDTB_SEOa'
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
              username: 'KDTB_SEOa'
            },
            body: JSON.stringify({
              title
            })
          }
        )
      ).json()
      return res.json() as Promise<Todo>
    },
    onMutate: title => {
      //Mutate Function 이 실행되면서 먼저 실행 되는것.
      //배열.unshift(데이터)
      // const todos = queryClient.getQueryData(['todos']) as Todo[]
      // if (todos) {
      //   queryClient.setQueryData(['todos'], [todo, ...todos])
      // }

      const newTodo = { id: Math.random().toString(), title }
      const todos = queryClient.getQueryData<Todo[]>(['todos'])
      if (todos) {
        queryClient.setQueryData(['todos'], [newTodo, ...todos])
      }
    },
    onSuccess: async () => {
      console.log(
        '무효화하기 전 data',
        queryClient.getQueryData<Todo[]>(['todo'])![0]
      )

      await queryClient.invalidateQueries({ queryKey: ['todo'] })
    }
  })
}
