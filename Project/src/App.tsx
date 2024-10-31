import { useState } from 'react'
import { useFetchMovies } from '@/hooks/movie.infinite'
import Loader from '@/components/Loader'

export default function App() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isLoading,
    searchText,
    setSearchText,
    refetch
  } = useFetchMovies()
  const [inputText, setInputText] = useState('')

  function searchMovies() {
    refetch()
  }
  return (
    <>
      <div>
        <input
          value={searchText}
          onChange={e => setSearchText(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && searchMovies()}
        />
        <button onClick={() => searchMovies()}>검색</button>
        {isLoading && <Loader />}
        {data?.pages.map(page => {
          return page.Search.map(movie => {
            return <div key={movie.imdbID}>{movie.Title}</div>
          })
        })}
        {hasNextPage && <button onClick={() => fetchNextPage()}>더보기</button>}
      </div>
    </>
  )
}
