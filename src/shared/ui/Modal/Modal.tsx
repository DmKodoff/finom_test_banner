import React, { ReactNode, useId } from 'react'
import { cn } from '@/shared/lib/utils'
import { Button } from '@/shared/ui/Button'
import CloseIcon from './assets/icons/close.svg?react'
import { useModal } from './useModal'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
  className?: string
  closeOnOverlayClick?: boolean
  'aria-labelledby'?: string
  'aria-describedby'?: string
}

const Modal = ({
  isOpen,
  onClose,
  children,
  className = '',
  closeOnOverlayClick = true,
  'aria-labelledby': ariaLabelledBy,
  'aria-describedby': ariaDescribedBy,
}: ModalProps) => {
  useModal({ isOpen })
  const generatedId = useId()
  const titleId = ariaLabelledBy || `modal-title-${generatedId}`
  const descriptionId = ariaDescribedBy || `modal-description-${generatedId}`

  if (!isOpen) {
    return null
  }

  const handleOverlayClick = () => {
    if (!closeOnOverlayClick) {
      return
    }

    onClose()
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Escape') {
      onClose()
    }
  }

  return (
    <div
      className='fixed inset-0 z-50 flex items-center justify-center p-4'
      role='dialog'
      aria-modal='true'
      aria-labelledby={titleId}
      aria-describedby={descriptionId}
      onKeyDown={handleKeyDown}
    >
      <div
        className='fixed inset-0 backdrop-blur-sm transition-opacity'
        aria-hidden='true'
        onClick={handleOverlayClick}
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
          className='absolute top-3 right-2 md:right-3  w-7 h-7 md:w-8 md:h-8 rounded-full bg-gray-100 hover:bg-transparent text-text-default transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-border-modal focus:ring-offset-2 z-20'
          aria-label='Close modal'
        >
          <CloseIcon className='w-5 h-5 md:w-6 md:h-6' aria-hidden='true' />
        </Button>
        {children}
      </div>
    </div>
  )
}

export default Modal
