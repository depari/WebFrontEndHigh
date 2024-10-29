import { Link } from 'react-router-dom'
import { useMovieStore } from '@/stores/movie'

export default function List() {
  const movies = useMovieStore(state => state.movies)
  return (
    <ul>
      {movies?.map(movie => {
        return (
          <li key={movie.imdbID}>
            <Link to={`/movies/${movie.imdbID}`}>{movie.Title}</Link>
          </li>
        )
      })}
    </ul>
  )
}
