import { useState } from 'react'
import { Link, Outlet } from 'react-router-dom'

export interface Movie {
  Title: string
  Year: string
  imdbID: string
  Type: string
  Poster: string
}

export default function Movies() {
  //const [getter, setter] = useState(초기값)
  const [searchText, setSearchText] = useState('')
  const [movies, setMovies] = useState<Movie[]>([])

  async function searchMovies() {
    //..
    const res = await fetch(
      `https://omdbapi.com/?apikey=7035c60c&s=${searchText}`
    )
    const { Search } = await res.json()
    setMovies(Search)
    console.log(Search)
  }
  return (
    <>
      <h1>Movies Page!</h1>
      <div>
        <input
          value={searchText}
          onChange={e => setSearchText(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && searchMovies()}
        />
        <button onClick={searchMovies}>검색</button>
      </div>
      <ul>
        {movies?.map(movie => {
          return (
            <li key={movie.imdbID}>
              <Link to={`/movies/${movie.imdbID}`}>{movie.Title}</Link>
            </li>
          )
        })}
      </ul>
      <Outlet />
    </>
  )
}
