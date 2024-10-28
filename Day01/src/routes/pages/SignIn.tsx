import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function SignIn() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  // React.이벤트_타임<이벤트가_발생한_요소>
  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    console.log(email, password)
    if (email && password) {
      // 세션 정보(엑세스 토큰)
      localStorage.setItem('accessToken', 'abcd1234')
      // Main Page 로 이동
      navigate('/')
    }
  }
  //<></> Fragment
  return (
    <>
      <h1> Sign In Page!</h1>
      <form onSubmit={onSubmit}>
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button type="submit"> 로그인 </button>
      </form>
    </>
  )
}
