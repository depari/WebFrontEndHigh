import MovieList from './components/MovieList'
import { useState } from 'react'
import { useCreateTodo, userFetchTodos } from './hooks/todo'

export default function App() {
  const { data: todos } = userFetchTodos()
  const { mutate: createToto } = useCreateTodo()
  const [todotitle, setTodoTitle] = useState('')

  return (
    <>
      <div>
        <input
          type="text"
          onChange={e => setTodoTitle(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && createToto(todotitle)}
        />
        <button onClick={() => createToto(todotitle)}>추가</button>
      </div>
      {todos?.map(todo => {
        return (
          <div key={todo.id}>
            <div>{todo.title}</div>
          </div>
        )
      })}
    </>
  )
}
