import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'

export default function App() {
  const [searchText, setSearchText] = useState('')

  const { data, refetch } = useQuery({
    queryKey: ['movies'],
    queryFn: async () => {
      const res = await fetch(
        `https://omdbapi.com/?apikey=7035c60c&s=${searchText}`
      )
      const { Search } = await res.json()
      console.log(Search)
      return Search
    },
    enabled: false,
    staleTime: 1000 * 60 //1분
  })

  return (
    <>
      <h1>Movie List!</h1>
      <input
        value={searchText}
        onChange={e => setSearchText(e.target.value)}
        onKeyDown={e => e.key === 'Enter' && refetch()}
      />
      {data?.map((movie: any) => {
        return <div key={movie.imdbID}>{movie.Title}</div>
      })}
    </>
  )
}
