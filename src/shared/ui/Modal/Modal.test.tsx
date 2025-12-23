import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Modal from './Modal'

describe('Modal', () => {
  const mockOnClose = vi.fn()
  const defaultProps = {
    isOpen: true,
    onClose: mockOnClose,
    children: <div>Test Content</div>,
  }

  beforeEach(() => {
    mockOnClose.mockClear()
    // Reset body overflow
    document.body.style.overflow = ''
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  describe('Rendering', () => {
    it('should render modal when isOpen is true', () => {
      render(<Modal {...defaultProps} />)

      expect(screen.getByRole('dialog')).toBeInTheDocument()
      expect(screen.getByText('Test Content')).toBeInTheDocument()
    })

    it('should not render modal when isOpen is false', () => {
      render(<Modal {...defaultProps} isOpen={false} />)

      expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    })

    it('should render with custom className', () => {
      const { container } = render(
        <Modal {...defaultProps} className='custom-class' />
      )

      const content = container.querySelector('.custom-class')
      expect(content).toBeInTheDocument()
    })

    it('should render with custom aria-describedby', () => {
      render(<Modal {...defaultProps} aria-describedby='custom-description' />)

      const modal = screen.getByRole('dialog')
      expect(modal).toHaveAttribute('aria-describedby', 'custom-description')
    })

    it('should generate aria-describedby when not provided', () => {
      render(<Modal {...defaultProps} />)

      const modal = screen.getByRole('dialog')
      expect(modal).toHaveAttribute('aria-describedby')
    })
  })

  describe('Accessibility', () => {
    it('should have correct ARIA attributes', () => {
      render(<Modal {...defaultProps} />)

      const modal = screen.getByRole('dialog')
      expect(modal).toHaveAttribute('aria-modal', 'true')
      expect(modal).toHaveAttribute('aria-labelledby')
      expect(modal).toHaveAttribute('aria-describedby')
    })

    it('should have close button with correct aria-label', () => {
      render(<Modal {...defaultProps} />)

      const closeButton = screen.getByLabelText('Close modal')
      expect(closeButton).toBeInTheDocument()
    })
  })

  describe('Close functionality', () => {
    it('should call onClose when close button is clicked', async () => {
      const user = userEvent.setup()
      render(<Modal {...defaultProps} />)

      const closeButton = screen.getByLabelText('Close modal')
      await user.click(closeButton)

      expect(mockOnClose).toHaveBeenCalledTimes(1)
    })

    it('should call onClose when backdrop is clicked', async () => {
      const user = userEvent.setup()
      render(<Modal {...defaultProps} />)

      const backdrop = screen
        .getByRole('dialog')
        .querySelector('[aria-hidden="true"]')
      expect(backdrop).toBeInTheDocument()

      if (backdrop) {
        await user.click(backdrop)
        expect(mockOnClose).toHaveBeenCalledTimes(1)
      }
    })

    it('should not call onClose when backdrop is clicked and closeOnOverlayClick is false', async () => {
      const user = userEvent.setup()
      render(<Modal {...defaultProps} closeOnOverlayClick={false} />)

      const backdrop = screen
        .getByRole('dialog')
        .querySelector('[aria-hidden="true"]')
      expect(backdrop).toBeInTheDocument()

      if (backdrop) {
        await user.click(backdrop)
        expect(mockOnClose).not.toHaveBeenCalled()
      }
    })

    it('should not call onClose when modal content is clicked', async () => {
      const user = userEvent.setup()
      render(<Modal {...defaultProps} />)

      const content = screen.getByText('Test Content')
      await user.click(content)

      expect(mockOnClose).not.toHaveBeenCalled()
    })

    it('should call onClose when Escape key is pressed', () => {
      render(<Modal {...defaultProps} />)

      const modal = screen.getByRole('dialog')
      fireEvent.keyDown(modal, { key: 'Escape', code: 'Escape' })

      expect(mockOnClose).toHaveBeenCalledTimes(1)
    })

    it('should call onClose when Enter key is pressed on close button', async () => {
      const user = userEvent.setup()
      render(<Modal {...defaultProps} />)

      const closeButton = screen.getByLabelText('Close modal')
      closeButton.focus()
      await user.keyboard('{Enter}')

      expect(mockOnClose).toHaveBeenCalledTimes(1)
    })

    it('should call onClose when Space key is pressed on close button', async () => {
      const user = userEvent.setup()
      render(<Modal {...defaultProps} />)

      const closeButton = screen.getByLabelText('Close modal')
      closeButton.focus()
      await user.keyboard(' ')

      expect(mockOnClose).toHaveBeenCalledTimes(1)
    })
  })

  describe('Body overflow management', () => {
    it('should set body overflow to hidden when modal opens', () => {
      document.body.style.overflow = 'auto'
      render(<Modal {...defaultProps} />)

      expect(document.body.style.overflow).toBe('hidden')
    })

    it('should restore body overflow when modal closes', () => {
      document.body.style.overflow = 'auto'
      const { rerender } = render(<Modal {...defaultProps} />)

      expect(document.body.style.overflow).toBe('hidden')

      rerender(<Modal {...defaultProps} isOpen={false} />)

      expect(document.body.style.overflow).toBe('auto')
    })
  })
})
