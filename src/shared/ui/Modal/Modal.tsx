import { ReactNode, useCallback, useEffect, useId, useRef } from 'react'
import { cn, isBrowser } from '@/shared/lib/utils'
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
  const modalRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const previousActiveElementRef = useRef<HTMLElement | null>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const onCloseRef = useRef(onClose)
  const generatedId = useId()
  const titleId = ariaLabelledBy || `modal-title-${generatedId}`
  const descriptionId = ariaDescribedBy || `modal-description-${generatedId}`

  useEffect(() => {
    onCloseRef.current = onClose
  }, [onClose])

  const getFocusableElements = useCallback((): HTMLElement[] => {
    if (!isBrowser || !modalRef.current) return []
    return Array.from(
      modalRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )
    ) as HTMLElement[]
  }, [])

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onCloseRef.current()
        return
      }

      if (e.key !== 'Tab' || !modalRef.current) {
        return
      }

      const focusableElements = getFocusableElements()

      if (focusableElements.length === 0) {
        return
      }

      const firstElement = focusableElements[0]
      const lastElement = focusableElements[focusableElements.length - 1]
      const activeElement = document.activeElement
      const currentIndex =
        activeElement instanceof HTMLElement
          ? focusableElements.indexOf(activeElement)
          : -1

      e.preventDefault()

      if (e.shiftKey) {
        if (currentIndex <= 0) {
          lastElement.focus()
        } else {
          focusableElements[currentIndex - 1].focus()
        }
      } else {
        if (
          currentIndex >= focusableElements.length - 1 ||
          currentIndex === -1
        ) {
          firstElement.focus()
        } else {
          focusableElements[currentIndex + 1].focus()
        }
      }
    },
    [getFocusableElements]
  )

  const setFocus = useCallback((element: HTMLElement | null) => {
    if (element && typeof element.focus === 'function') {
      element.focus()
    }
  }, [])

  const updateFocus = useCallback(() => {
    if (!isOpen || !isBrowser) {
      return
    }

    const focusableElements = getFocusableElements()

    if (focusableElements.length > 0) {
      setFocus(focusableElements[0])
    } else if (closeButtonRef.current) {
      setFocus(closeButtonRef.current)
    }
  }, [isOpen, getFocusableElements, setFocus])

  useEffect(() => {
    if (!isOpen || !isBrowser) {
      return
    }

    const activeElement = document.activeElement
    if (activeElement instanceof HTMLElement) {
      previousActiveElementRef.current = activeElement
    }

    updateFocus()

    const modalElement = modalRef.current
    if (!modalElement) {
      return
    }

    modalElement.addEventListener('keydown', handleKeyDown)

    return () => {
      modalElement.removeEventListener('keydown', handleKeyDown)

      if (previousActiveElementRef.current) {
        setFocus(previousActiveElementRef.current)
      }
    }
  }, [isOpen, handleKeyDown, updateFocus, setFocus])

  useEffect(() => {
    if (!isOpen || !isBrowser || !contentRef.current) {
      return
    }

    const observer = new MutationObserver(() => {
      setTimeout(() => {
        updateFocus()
      }, 0)
    })

    observer.observe(contentRef.current, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['disabled', 'hidden', 'aria-hidden'],
    })

    return () => {
      observer.disconnect()
    }
  }, [isOpen, updateFocus])

  if (!isOpen) {
    return null
  }

  const handleOverlayClick = () => {
    if (!closeOnOverlayClick) {
      return
    }

    onCloseRef.current()
  }

  return (
    <div
      ref={modalRef}
      className='fixed inset-0 z-50 flex items-center justify-center p-4'
      role='dialog'
      aria-modal='true'
      aria-labelledby={titleId}
      aria-describedby={descriptionId}
    >
      <div
        className='fixed inset-0 backdrop-blur-sm transition-opacity'
        aria-hidden='true'
        onClick={handleOverlayClick}
      />
      <div
        ref={contentRef}
        className={cn(
          'relative z-10 rounded-lg bg-bg-content overflow-hidden',
          className
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <Button
          ref={closeButtonRef}
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
