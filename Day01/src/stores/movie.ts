import { create } from 'zustand'
import { combine } from 'zustand/middleware'

export interface Movie {
  Title: string
  Year: string
  imdbID: string
  Type: string
  Poster: string
}

export const useMovieStore = create(
  combine(
    {
      movies: [] as Movie[],
      loading: false
    },
    set => {
      return {
        fetchMovies: async (searchText: string) => {
          set({
            loading: true
          })
          const res = await fetch(
            `https://omdbapi.com/?apikey=7035c60c&s=${searchText}`
          )
          const { Search } = await res.json()
          set({
            movies: Search,
            loading: false
          })
        }
      }
    }
  )
)
