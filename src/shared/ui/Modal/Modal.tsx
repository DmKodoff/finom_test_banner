import { ReactNode, useEffect, useRef } from 'react'
import { cn } from '@/shared/lib/utils'
import { Button } from '@/shared/ui/Button'
import CloseIcon from './assets/icons/close.svg?react'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
  className?: string
}

// Shared state for managing multiple modals
const modalState = {
  count: { current: 0 },
  originalOverflow: { current: '' },
}

const Modal = ({ isOpen, onClose, children, className = '' }: ModalProps) => {
  const wasOpenRef = useRef(false)

  useEffect(() => {
    // Handle modal opening
    if (isOpen && !wasOpenRef.current) {
      wasOpenRef.current = true

      if (modalState.count.current === 0) {
        modalState.originalOverflow.current = document.body.style.overflow
        document.body.style.overflow = 'hidden'
      }

      modalState.count.current++
    }

    // Handle modal closing - cleanup always runs
    // This handles both: modal closing (isOpen becomes false) and component unmounting
    return () => {
      if (wasOpenRef.current) {
        wasOpenRef.current = false
        modalState.count.current--

        if (modalState.count.current === 0) {
          document.body.style.overflow = modalState.originalOverflow.current
        }
      }
    }
  }, [isOpen])

  if (!isOpen) {
    return null
  }

  return (
    <div
      className='fixed inset-0 z-50 flex items-center justify-center p-4'
      role='dialog'
      aria-modal='true'
      aria-label='Modal'
    >
      <div
        className='fixed inset-0 backdrop-blur-sm transition-opacity'
        aria-hidden='true'
      />
      <div
        className={cn(
          'relative z-10 rounded-lg bg-bg-content overflow-hidden',
          className
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <Button
          type='button'
          variant='ghost'
          size='icon'
          onClick={onClose}
          onKeyDown={(event) => {
            if (event.key === 'Enter' || event.key === ' ') {
              event.preventDefault()
              onClose()
            }
          }}
          className='absolute top-3 right-2 md:right-3  w-7 h-7 md:w-8 md:h-8 rounded-full bg-gray-100 hover:bg-transparent text-text-default transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-border-modal focus:ring-offset-2 z-20'
          aria-label='Close modal'
          tabIndex={0}
        >
          <CloseIcon className='w-5 h-5 md:w-6 md:h-6' aria-hidden='true' />
        </Button>
        {children}
      </div>
    </div>
  )
}

export default Modal
