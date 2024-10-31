import { useState } from 'react'
import { useUpdateTodo, type Todo, useDeleteTodo } from '@/hooks/todo'

export default function TodoItem({ todo }: { todo: Todo }) {
  const { mutate: mutateToUpdate, isPending } = useUpdateTodo()
  const { mutate: mutateToDelete } = useDeleteTodo()
  const [isEditMode, setIsEditMode] = useState(false)
  const [title, setTitle] = useState(todo.title)

  async function updateTodo(title: string) {
    mutateToUpdate({
      ...todo,
      title
    })
    offEditMode()
  }

  async function deleteTodo() {
    console.log('deleteTodo')
    mutateToDelete(todo)
    offEditMode()
  }

  function onEditMode() {
    setIsEditMode(true)
  }

  function offEditMode() {
    setIsEditMode(false)
  }

  return (
    <div key={todo.id}>
      {isEditMode ? (
        <>
          <input
            disabled={isPending}
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          <button
            onClick={() => {
              updateTodo(title)
            }}>
            {isPending ? '저장 중' : '저장'}
          </button>
          <button
            onClick={() => {
              deleteTodo()
            }}>
            삭제
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
