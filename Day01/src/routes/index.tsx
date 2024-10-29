import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import DefaultLayout from './layouts/Default'
import Home from './pages/Home'
import About from './pages/About'
import SignIn from './pages/SignIn'
import Movies from './pages/Movies'
import MovieDetails from './pages/MovieDetails'
import NotFound from './pages/NotFound'
import requiresAuth from './loaders/requiresAuth'

// route 정보
// router 제어
const router = createBrowserRouter([
  {
    element: <DefaultLayout />,
    children: [
      //Route 객체 (정보)
      {
        path: '/', //http://localhost:5713/
        element: <Home />
      },
      {
        path: '/about', //http://localhost:5713/about
        element: <About />
      },
      {
        path: '/signin', //http://localhost:5713/signin
        element: <SignIn />
      },
      {
        path: '/movies',
        element: <Movies />,
        loader: () => {
          return requiresAuth()
        },
        children: [
          {
            path: '/movies/:movieId',
            element: <MovieDetails />
          }
        ]
      }
    ]
  },
  {
    path: '*',
    element: <NotFound />
  }
])

export default function Router() {
  return <RouterProvider router={router} />
}
