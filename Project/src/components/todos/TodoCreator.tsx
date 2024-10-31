import { useCreateTodo } from '@/hooks/todo'
import { useState } from 'react'

export default function TodoCreator() {
  const { mutate: createToto } = useCreateTodo()
  const [todotitle, setTodoTitle] = useState('')

  return (
    <>
      <div>
        <input
          value={todotitle}
          onChange={e => setTodoTitle(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && createToto(todotitle)}
        />
        <button onClick={() => createToto(todotitle)}>추가</button>
      </div>
    </>
  )
}
