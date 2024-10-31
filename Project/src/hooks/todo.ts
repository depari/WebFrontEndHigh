import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

export interface Todo {
  id: string
  order: number
  title: string
  done: boolean
  createdAt: string
  updatedAt: string
}

export function useFetchTodos() {
  return useQuery<Todo[]>({
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
      // console.log(
      //   '무효화하기 전 data',
      //   queryClient.getQueryData<Todo[]>(['todo'])![0]
      // )

      await queryClient.invalidateQueries({ queryKey: ['todo'] })
      console.log(
        '무효화한 후 data',
        queryClient.getQueryData<Todo[]>(['todo'])![0]
      )
    }
  })
}

export function useUpdateTodo() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (todo: Todo) => {
      const res = await await fetch(
        `https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos/${todo.id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            apikey: 'KDT8_bcAWVpD8',
            username: 'KDTB_SEOa'
          },
          body: JSON.stringify({
            title: todo.title,
            done: todo.done
          })
        }
      )
      return res.json()
    },
    onMutate: () => {},
    onSuccess: (todo: Todo) => {
      const todos = queryClient.getQueryData<Todo[]>(['todos'])
      if (todos) {
        queryClient.setQueryData(
          ['todos'],
          todos.map(t => (t.id === todo.id ? todo : t))
        )
      }
    },
    onError: () => {},
    onSettled: () => {}
  })
}
