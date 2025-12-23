import { useEffect, useRef } from 'react'
import { isBrowser } from '@/shared/lib/utils'

const modalState = {
  count: { current: 0 },
  originalOverflow: { current: '' },
}

interface UseModalOptions {
  isOpen: boolean
}

export const useModal = ({ isOpen }: UseModalOptions) => {
  const wasOpenRef = useRef(false)
  const instanceIdRef = useRef<symbol | null>(null)

  useEffect(() => {
    if (!isBrowser) {
      return
    }

    if (!instanceIdRef.current) {
      instanceIdRef.current = Symbol('modal-instance')
    }

    const previousWasOpen = wasOpenRef.current
    const instanceId = instanceIdRef.current

    if (isOpen && !previousWasOpen) {
      wasOpenRef.current = true

      if (modalState.count.current === 0 && document.body) {
        modalState.originalOverflow.current = document.body.style.overflow
        document.body.style.overflow = 'hidden'
      }

      modalState.count.current++
    } else if (!isOpen && previousWasOpen) {
      wasOpenRef.current = false

      if (modalState.count.current > 0) {
        modalState.count.current--
      }

      if (modalState.count.current === 0 && document.body) {
        document.body.style.overflow = modalState.originalOverflow.current
        modalState.originalOverflow.current = ''
      }
    }

    return () => {
      if (wasOpenRef.current && instanceId === instanceIdRef.current) {
        wasOpenRef.current = false

        if (modalState.count.current > 0) {
          modalState.count.current--
        }

        if (modalState.count.current === 0 && document.body) {
          document.body.style.overflow = modalState.originalOverflow.current
          modalState.originalOverflow.current = ''
        }
      }
    }
  }, [isOpen])

  return {
    isOpen,
  }
}
