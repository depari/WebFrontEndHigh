import { useState } from 'react'
import { useUpdateTodo, type Todo } from '@/hooks/todo'

export default function TodoItem({ todo }: { todo: Todo }) {
  const { mutateAsync } = useUpdateTodo()
  const [isEditMode, setIsEditMode] = useState(false)
  const [title, setTitle] = useState(todo.title)

  async function updateTodo(title: string) {
    await mutateAsync({
      ...todo,
      title
    })
    setIsEditMode(false)
  }

  return (
    <div key={todo.id}>
      {isEditMode ? (
        <>
          <input
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          <button
            onClick={() => {
              updateTodo(title)
            }}>
            저장
          </button>
        </>
      ) : (
        <>
          <div>{todo.title}</div>
          <button
            onClick={() => {
              setIsEditMode(true)
            }}>
            수정하기
          </button>
        </>
      )}
    </div>
  )
}
