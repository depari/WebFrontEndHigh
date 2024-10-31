import { useRef, useEffect } from 'react'
import { useFetchMovies } from '@/hooks/movie.infinite'
import Loader from '@/components/Loader'
import { useInView } from 'react-intersection-observer'

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

  const { ref, inView } = useInView()

  useEffect(() => {
    if (isLoading) return
    if (inView) {
      fetchNextPage()
    }
  }, [inView])

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
        {data?.pages.map(page => {
          return page.Search.map(movie => {
            return <div key={movie.imdbID}>{movie.Title}</div>
          })
        })}
        {isLoading && <Loader />}
        {!isLoading && hasNextPage && (
          <button
            ref={ref}
            onClick={() => fetchNextPage()}>
            더보기
          </button>
        )}
      </div>
    </>
  )
}
