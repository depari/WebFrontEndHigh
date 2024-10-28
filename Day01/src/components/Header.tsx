import { NavLink } from 'react-router-dom'
import styles from './Header.module.css'

const navigations = [
  { to: '/', lable: 'Home' },
  { to: '/about', lable: 'About' },
  { to: '/signin', lable: 'Sign In' },
  { to: '/movies', lable: 'Movies' }
]

export default function Header() {
  return (
    <header>
      <ul>
        {navigations.map(nav => {
          return (
            <li key={nav.to}>
              <NavLink
                to={nav.to}
                className={({ isActive }) => (isActive ? styles.active : '')}>
                {nav.lable}
              </NavLink>
            </li>
          )
        })}
      </ul>
    </header>
  )
}
