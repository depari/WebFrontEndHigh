import List from '@/components/movies/List'
import Search from '@/components/movies/Search'

import { Outlet } from 'react-router-dom'

export default function Movies() {
  //const [getter, setter] = useState(초기값)

  return (
    <>
      <h1>Movies Page!</h1>
      <Search />
      <List />
      <Outlet />
    </>
  )
}
