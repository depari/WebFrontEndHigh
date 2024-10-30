import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

export interface Movie {
  Title: string
  Year: string
  imdbID: string
  Type: string
  Poster: string
}

export const useFetchMovies = (id: string | number) => {
  const [searchText, setSearchText] = useState('')
  const [shouldFectch, setShouldFectch] = useState(false)
  const query = useQuery<Movie[]>({
    queryKey: ['movies', id],
    queryFn: async () => {
      const res = await fetch(
        `https://omdbapi.com/?apikey=7035c60c&s=${searchText}`
      )
      const { Search } = await res.json()
      console.log(Search)
      return Search
    },
    enabled: shouldFectch,
    staleTime: 1000 * 60 //1분
    // select: data => data.filter(movie => Number.parseFloat(movie.Year) >= 2010)
  })

  function refetch() {
    if (!shouldFectch) setShouldFectch(true)
    query.refetch()
  }

  return {
    query: {
      ...query,
      refetch
    },
    searchText: {
      get: () => searchText,
      set: setSearchText
    },
    setShouldFectch
  }
}
