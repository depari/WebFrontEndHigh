import { useState } from 'react'
import { useMovieStore } from '@/stores/movie'

export default function Search() {
  const [searchText, setSearchText] = useState('')
  const fetchMovies = useMovieStore(state => state.fectchMovies)
  async function searchMovies() {
    const data = await fetchMovies()
    setMovies(data)
    // console.log(data)
  }

  return (
    <div>
      <input
        value={searchText}
        onChange={e => setSearchText(e.target.value)}
        onKeyDown={e => e.key === 'Enter' && fetchMovies(searchText)}
      />
      <button onClick={fetchMovies(searchText)}>검색</button>
    </div>
  )
}
