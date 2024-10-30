import { useQueries } from '@tanstack/react-query'

export default function App() {
  useQueries({
    queryKey: ['movie'],
    queryFn: async () => {
      const res = await fetch(`https://api.heropy.dev/v0/delay?t=${wait}`)
      const data = await res.json()
      return data
    }
  })
  return <h1>App.tsx</h1>
}
