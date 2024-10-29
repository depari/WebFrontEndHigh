import { create } from 'zustand'

export interface Movie {
  Title: string
  Year: string
  imdbID: string
  Type: string
  Poster: string
}

interface Store {
  movies: Movie[]
  fetchMovies: (searchText: string) => Promise<void>
}

export const useMovieStore = create<Store>((set, get) => {
  return {
    movies: [] as Movie[],
    fetchMovies: async (searchText: string) => {
      const res = await fetch(
        `https://omdbapi.com/?apikey=7035c60c&s=${searchText}`
      )
      const { Search } = await res.json()
      set({
        movies: Search
      })
    }
  }
})