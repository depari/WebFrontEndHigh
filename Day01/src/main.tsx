import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.tsx'
// import Router from '@/routes/index' //index 는 먼저 찾게 된다.- 생략 가능
import Router from '@/routes'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router />
  </StrictMode>
)
