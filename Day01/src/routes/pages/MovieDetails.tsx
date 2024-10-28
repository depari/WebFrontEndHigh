import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

export interface Rating {
  Source: string
  Value: string
}
export interface MovieDetails {
  Title: string
  Year: string
  Rated: string
  Released: string
  Runtime: string
  Genre: string
  Director: string
  Writer: string
  Actors: string
  Plot: string
  Language: string
  Country: string
  Awards: string
  Poster: string
  Ratings: Rating[]
  Metascore: string
  imdbRating: string
  imdbVotes: string
  imdbID: string
  Type: string
  DVD: string
  BoxOffice: string
  Production: string
  Website: string
  Response: string
}

export default function MovieDetails() {
  const { movieId } = useParams()
  const [movie, setMovie] = useState<MovieDetails>()

  useEffect(() => {
    fetchMovieDetails()
  }, [])

  async function fetchMovieDetails() {
    const res = await fetch(`https://omdbapi.com/?apikey=7035c60c&i=${movieId}`)
    const data = await res.json()
    setMovie(data)
    console.log(data)
  }

  return (
    <>
      <h1> Movie Detils Page! : {movieId}</h1>
      {movie && (
        <>
          <h2>{movie.Title}</h2>
          <img
            src={movie.Poster}
            alt={movie.Title}
          />
          <p>{movie.Director}</p>
          <p>{movie.Actors}</p>
          <p>{movie.Plot}</p>
        </>
      )}
    </>
  )
}
