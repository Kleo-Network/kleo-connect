import { useEffect, useRef } from 'react'

const useBodyScroll = (isOpen: boolean) => {
  const bodyRef = useRef(document.querySelector('body'))

  useEffect(() => {
    const updatePageScroll = () => {
      bodyRef.current?.style.setProperty('overflow', isOpen ? 'hidden' : '')
    }

    updatePageScroll()
  }, [isOpen])
}

export default useBodyScroll
