// http://localhost:3000/movies/tt4154796?plot=short

// Next14 =>> const { movieId } = params
// Next15 =>> const { movieId } = await params
'use client'
import { use, useState, useEffect } from 'react'

interface Movie {
  Title: string
  Plot: string
  Poster: string
}

export default function Page({
  params,
  searchParams
}: {
  params: Promise<{ movieId: string }>
  searchParams: Promise<{ plot: 'full' | 'short' }>
}) {
  const { movieId } = use(params)
  const { plot } = use(searchParams)
  const [title, setTitle] = useState('')
  const [movie, setMovie] = useState<Movie>()

  // const fetchMovieDetails = useCallback(async () => {
  //   const res = await fetch(
  //     `http://omdbapi.com/?apikey=7035c60c&i=${movieId}&plot=${plot}`
  //   )
  //   return res.json()
  // }, [movieId, plot])

  useEffect(() => {
    fetchMovieDetails().then(movie => {
      setMovie(movie)
      setTitle(movie.Title)
    })
    // eslint-disable-next-line
  }, [])

  async function fetchMovieDetails() {
    const res = await fetch(
      `http://omdbapi.com/?apikey=7035c60c&i=${movieId}&plot=${plot}`
    )
    return res.json()
  }

  function onClick() {
    setTitle(title.toLocaleUpperCase())
  }

  return (
    <>
      <h1>Dynamic Movie Details</h1>
      <h2 onClick={onClick}>{title}</h2>
      <p>{movie?.Plot}</p>
      <img
        src={movie?.Poster}
        alt={movie?.Title}
      />
    </>
  )
}
