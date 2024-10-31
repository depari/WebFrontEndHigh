import { useFetchTodos } from '@/hooks/todo'
import type { Todo } from '@/hooks/todo'
import TodoItem from './TodoItem'

export default function TodoList() {
  const { data: todos } = useFetchTodos()
  return (
    <>
      {todos?.map(todo => {
        return <TodoItem todo={todo} />
      })}
    </>
  )
}
