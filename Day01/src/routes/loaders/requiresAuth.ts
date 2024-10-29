import { redirect } from 'react-router-dom'

export default async function requiresAuth() {
  const token = localStorage.getItem('accessToken')
  if (!token) {
    return redirect('/signin')
  }

  return { name: 'seo', age: 35 }
}
