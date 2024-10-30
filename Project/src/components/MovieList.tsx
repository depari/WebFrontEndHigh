import { useFetchMovies } from '@/hooks/movie'

export default function MovieList({ id }: { id: string | number }) {
  const {
    query: { data, refetch, isLoading, isFetching },
    searchText
  } = useFetchMovies(id)
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
    </>
  )
}
