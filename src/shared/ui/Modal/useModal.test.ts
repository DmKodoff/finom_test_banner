import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { renderHook } from '@testing-library/react'
import { useModal } from './useModal'

describe('useModal', () => {
  beforeEach(() => {
    document.body.style.overflow = ''
  })

  afterEach(() => {
    document.body.style.overflow = ''
  })

  it('should set body overflow to hidden when modal opens', () => {
    document.body.style.overflow = 'auto'
    renderHook(() => useModal({ isOpen: true }))

    expect(document.body.style.overflow).toBe('hidden')
  })

  it('should restore body overflow when modal closes', () => {
    document.body.style.overflow = 'auto'
    const { rerender } = renderHook(({ isOpen }) => useModal({ isOpen }), {
      initialProps: { isOpen: true },
    })

    expect(document.body.style.overflow).toBe('hidden')

    rerender({ isOpen: false })

    expect(document.body.style.overflow).toBe('auto')
  })

  it('should handle multiple modals opening and closing', () => {
    document.body.style.overflow = 'auto'

    const { rerender: rerender1 } = renderHook(({ isOpen }) => useModal({ isOpen }), {
      initialProps: { isOpen: true },
    })

    const { rerender: rerender2 } = renderHook(({ isOpen }) => useModal({ isOpen }), {
      initialProps: { isOpen: true },
    })

    expect(document.body.style.overflow).toBe('hidden')

    rerender2({ isOpen: false })
    expect(document.body.style.overflow).toBe('hidden')

    rerender1({ isOpen: false })
    expect(document.body.style.overflow).toBe('auto')
  })

  it('should preserve original overflow style', () => {
    document.body.style.overflow = 'scroll'
    const { rerender } = renderHook(({ isOpen }) => useModal({ isOpen }), {
      initialProps: { isOpen: true },
    })

    expect(document.body.style.overflow).toBe('hidden')

    rerender({ isOpen: false })
    expect(document.body.style.overflow).toBe('scroll')
  })

  it('should handle cleanup on unmount', () => {
    document.body.style.overflow = 'auto'
    const { unmount } = renderHook(() => useModal({ isOpen: true }))

    expect(document.body.style.overflow).toBe('hidden')

    unmount()

    expect(document.body.style.overflow).toBe('auto')
  })
})

