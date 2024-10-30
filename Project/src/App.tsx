import MovieList from './components/MovieList'

export interface Movie {
  Title: string
  Year: string
  imdbID: string
  Type: string
  Poster: string
}

export default function App() {
  return (
    <>
      <MovieList id="01" />
    </>
  )
}
