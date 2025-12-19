import { ReactNode, useEffect } from 'react'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
  className?: string
}

let openModalsCount = 0
let originalBodyOverflow = ''

const Modal = ({ isOpen, onClose, children, className = '' }: ModalProps) => {
  useEffect(() => {
    if (!isOpen) {
      return
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    if (openModalsCount === 0) {
      originalBodyOverflow = document.body.style.overflow
      document.body.style.overflow = 'hidden'
    }

    openModalsCount++
    document.addEventListener('keydown', handleEscape)

    return () => {
      document.removeEventListener('keydown', handleEscape)
      openModalsCount--

      if (openModalsCount === 0) {
        document.body.style.overflow = originalBodyOverflow
      }
    }
  }, [isOpen, onClose])

  if (!isOpen) {
    return null
  }

  const handleBackdropClick = () => {
    onClose()
  }

  const handleModalContentClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation()
  }

  return (
    <div
      className='fixed inset-0 z-50 flex items-center justify-center p-4'
      role='dialog'
      aria-modal='true'
      aria-label='Modal'
    >
      <div
        className='fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm transition-opacity'
        onClick={handleBackdropClick}
        aria-hidden='true'
      />
      <div
        className={`relative z-10 bg-white rounded-lg border-2 border-purple-500 shadow-xl max-w-full max-h-[90vh] overflow-auto ${className}`}
        onClick={handleModalContentClick}
      >
        {children}
      </div>
    </div>
  )
}

export default Modal
