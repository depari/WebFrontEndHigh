import { useRef, useEffect } from 'react'
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

  const observerRef = useRef<HTMLButtonElement | null>(null)
  useEffect(() => {
    if (isLoading) return

    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          console.log('요소가 교차되었어요! fetchNextPage')
          fetchNextPage()
        }
      })
      // console.log('요소가 교차되었어요!', entries)
    })

    if (observerRef.current) {
      console.log('io.observe(observerRef.current)')
      io.observe(observerRef.current)
    }
    return () => {
      console.log('io.disconnect')
      io.disconnect()
    }
  }, [isLoading])

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
        {hasNextPage && (
          <button
            ref={observerRef}
            onClick={() => fetchNextPage()}>
            더보기
          </button>
        )}
      </div>
    </>
  )
}
