import { useNavigate } from 'react-router-dom'
import styles from './Modal.module.css'

export default function Modal({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate()
  function offModal() {
    //뒤로가기
    navigate(-1)
  }
  return (
    <div className={styles.model}>
      <div
        className={styles.overlay}
        onClick={offModal}></div>
      <div className={styles.content}>{children}</div>
    </div>
  )
}
