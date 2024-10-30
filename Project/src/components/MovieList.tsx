import { useFetchMovies } from '@/hooks/movie'
import { useQueryClient } from '@tanstack/react-query'

export default function MovieList({ id }: { id: string | number }) {
  const {
    query: { data, refetch, isLoading, isFetching },
    searchText
  } = useFetchMovies(id)

  const queryClient = useQueryClient()

  function getCachedDta() {
    const cachedData = queryClient.getQueryData(['movies', id])
    console.log('getCachedData', cachedData)
    // queryClient.getQueryData(query.queryKey)
  }
  return (
    <>
      <h1>Movie List!!</h1>
      <input
        value={searchText.get()}
        onChange={e => searchText.set(e.target.value)}
        onKeyDown={e => e.key === 'Enter' && refetch()}
      />
      {data?.map((movie: Movie) => {
        return <div key={movie.imdbID}>{movie.Title}</div>
      })}

      <button onClick={getCachedDta}>캐시된 데이터 Get</button>
    </>
  )
}
