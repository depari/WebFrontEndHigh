import Header from '@/components/Header'
import { useOutlet } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

export default function Default() {
  const outlet = useOutlet()
  return (
    <>
      <Header />
      {outlet}
    </>
  )
}
