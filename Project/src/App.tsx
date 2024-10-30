import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import MovieList from './components/MovieList'

export interface Movie {
  Title: string
  Year: string
  imdbID: string
  Type: string
  Poster: string
}

export default function App() {
  const [searchText, setSearchText] = useState('')

  const { data, refetch } = useQuery<Movie[]>({
    queryKey: ['movies'],
    queryFn: async () => {
      const res = await fetch(
        `https://omdbapi.com/?apikey=7035c60c&s=${searchText}`
      )
      const { Search } = await res.json()
      console.log(Search)
      return Search
    },
    enabled: false,
    staleTime: 1000 * 60, //1분
    initialData: [
      {
        Title:
          'Search 해보세요, Enter 치면 들어갑니다. 두글자 이상 입력 후 Enter 키!',
        Year: '1984',
        imdbID: 'tt0090190',
        Type: 'movie',
        Poster:
          'https://m.media-amazon.com/images/M/MV5BNDZjMGZjMDktOTZlNC00MTQ5LTkzY2UtZjM1MjE0NDcwNzk1XkEyXkFqcGc@._V1_SX300.jpg'
      }
    ],
    placeholderData: [
      {
        Title: '대기 중입니다. ',
        Year: '1984',
        imdbID: 'tt0090190',
        Type: 'movie',
        Poster:
          'https://m.media-amazon.com/images/M/MV5BNDZjMGZjMDktOTZlNC00MTQ5LTkzY2UtZjM1MjE0NDcwNzk1XkEyXkFqcGc@._V1_SX300.jpg'
      }
    ]
  })

  return (
    <>
      <MovieList id="01" />
    </>
  )
}
