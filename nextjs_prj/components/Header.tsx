'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navigations = [
  { href: '/', label: 'Home' },
  { href: '/movies', label: 'Movies' }
]

export default function Header() {
  const pathname = usePathname()

  return (
    <header className="flex items-center">
      <img
        src="https://heropy.dev/favicon.png"
        alt="HEROPY"
        width="50"
      />
      <nav className="flex">
        {navigations.map(navigation => (
          <Link
            key={navigation.href}
            href={navigation.href}
            className={`px-2 ${pathname === navigation.href ? 'text-blue-500' : ''}`}>
            {navigation.label}
          </Link>
        ))}
      </nav>
    </header>
  )
}
