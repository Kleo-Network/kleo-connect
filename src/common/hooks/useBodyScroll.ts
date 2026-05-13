import { useEffect, useRef } from 'react'

const useBodyScroll = (isOpen: boolean) => {
  const bodyRef = useRef(document.body)

  useEffect(() => {
    const updatePageScroll = () => {
      if (bodyRef.current) {
        bodyRef.current.style.overflow = isOpen ? 'hidden' : ''
      }
    }

    updatePageScroll()
  }, [isOpen])
}

export default useBodyScroll
