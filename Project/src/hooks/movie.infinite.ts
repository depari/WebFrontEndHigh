import { useInfiniteQuery } from '@tanstack/react-query'
import { useState } from 'react'

export interface SearchMovieResult {
  Search: Movie[]
  totalResults: string
  Response: string
}

export interface Movie {
  Title: string
  Year: string
  imdbID: string
  Type: string
  Poster: string
}

export const useFetchMovies = () => {
  const [searchText, setSearchText] = useState('')
  const query = useInfiniteQuery<SearchMovieResult>({
    queryKey: ['movies'],
    queryFn: async ({ pageParam }) => {
      const res = await fetch(
        `https://omdbapi.com/?apikey=7035c60c&s=${searchText}&page=${pageParam}`
      )
      return res.json()
    },
    initialPageParam: 1,
    getNextPageParam: (_lastPage, pages) => {
      // console.log('lastPage:', lastPage)
      // console.log('pages:', pages)
      const nextPage =
        Number.parseInt(pages[0].totalResults) > pages.length * 10
          ? pages.length + 1
          : undefined
      return nextPage
    },
    enabled: false
  })

  return {
    ...query,
    searchText,
    setSearchText
  }
}
