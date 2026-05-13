import { useEffect, useRef } from 'react'

const useBodyScroll = (isOpen: boolean) => {
  const bodyRef = useRef<HTMLBodyElement | null>(
    typeof document !== 'undefined' ? document.querySelector('body') : null
  )

  useEffect(() => {
    const body = bodyRef.current
    if (!body) return
    body.style.overflow = isOpen ? 'hidden' : ''
  }, [isOpen])
}

export default useBodyScroll
