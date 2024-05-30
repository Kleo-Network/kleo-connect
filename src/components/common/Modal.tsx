import React from 'react'
import { createPortal } from 'react-dom'
import { ReactComponent as CloseIcon } from '../../assets/images/cross.svg'
import useBodyScroll from './hooks/useBodyScroll'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  hideCloseButton?: boolean
  fixWidth?: boolean
}

const Modal = ({
  isOpen,
  onClose,
  hideCloseButton = false,
  children,
  fixWidth = false
}: React.PropsWithChildren<ModalProps>) => {
  useBodyScroll(isOpen)

  const modal = (
    <div className="fixed top-0 left-0 w-full h-full bg-overlay backdrop-blur-md flex justify-center items-center z-50">
      <div
        className={` ${
          fixWidth ? 'max-w-[400px]' : 'w-11/12'
        } md:w-1/2 bg-white rounded-xl shadow relative`}
      >
        {!hideCloseButton && (
          <button
            className="ml-auto mb-2 right-0 top-0 p-[10px] absolute rounded-full"
            onClick={onClose}
            aria-label="Close Modal"
          >
            <CloseIcon className="w-5 h-5" />
          </button>
        )}
        {children}
      </div>
    </div>
  )

  return isOpen ? createPortal(modal, document.body) : null
}

export default Modal
