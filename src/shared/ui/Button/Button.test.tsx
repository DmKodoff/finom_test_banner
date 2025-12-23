import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Button from './Button'

describe('Button', () => {
  const mockOnClick = vi.fn()

  beforeEach(() => {
    mockOnClick.mockClear()
    vi.spyOn(console, 'warn').mockImplementation(() => {})
  })

  describe('Rendering', () => {
    it('should render as button by default', () => {
      render(<Button>Click me</Button>)
      expect(
        screen.getByRole('button', { name: 'Click me' })
      ).toBeInTheDocument()
    })

    it('should render as anchor when href is provided', () => {
      render(<Button href='https://example.com'>Link</Button>)
      const link = screen.getByRole('link', { name: 'Link' })
      expect(link).toBeInTheDocument()
      expect(link).toHaveAttribute('href', 'https://example.com')
    })

    it('should render with loading state', () => {
      render(<Button loading>Loading</Button>)
      const button = screen.getByRole('button', { name: 'Loading' })
      expect(button).toHaveAttribute('aria-busy', 'true')
      expect(button).toHaveAttribute('aria-live', 'polite')
      expect(button).toBeDisabled()
    })
  })

  describe('URL validation', () => {
    it('should accept valid http URLs', () => {
      render(<Button href='http://example.com'>Link</Button>)
      const link = screen.getByRole('link')
      expect(link).toHaveAttribute('href', 'http://example.com')
    })

    it('should accept valid https URLs', () => {
      render(<Button href='https://example.com'>Link</Button>)
      const link = screen.getByRole('link')
      expect(link).toHaveAttribute('href', 'https://example.com')
    })

    it('should accept mailto: URLs', () => {
      render(<Button href='mailto:test@example.com'>Email</Button>)
      const link = screen.getByRole('link')
      expect(link).toHaveAttribute('href', 'mailto:test@example.com')
    })

    it('should accept tel: URLs', () => {
      render(<Button href='tel:+1234567890'>Call</Button>)
      const link = screen.getByRole('link')
      expect(link).toHaveAttribute('href', 'tel:+1234567890')
    })

    it('should accept relative paths', () => {
      render(<Button href='/path'>Link</Button>)
      const link = screen.getByRole('link')
      expect(link).toHaveAttribute('href', '/path')
    })

    it('should accept hash links', () => {
      render(<Button href='#section'>Link</Button>)
      const link = screen.getByRole('link')
      expect(link).toHaveAttribute('href', '#section')
    })

    it('should accept query string links', () => {
      render(<Button href='?param=value'>Link</Button>)
      const link = screen.getByRole('link')
      expect(link).toHaveAttribute('href', '?param=value')
    })

    it('should reject javascript: protocol (case insensitive)', () => {
      render(<Button href='javascript:alert(1)'>Invalid</Button>)
      const button = screen.getByRole('button', { name: 'Invalid' })
      expect(button).toBeInTheDocument()
      expect(button.tagName).toBe('BUTTON')
    })

    it('should reject JavaScript: protocol (uppercase)', () => {
      render(<Button href='JavaScript:alert(1)'>Invalid</Button>)
      const button = screen.getByRole('button', { name: 'Invalid' })
      expect(button).toBeInTheDocument()
      expect(button.tagName).toBe('BUTTON')
    })

    it('should reject data: protocol', () => {
      render(
        <Button href='data:text/html,<script>alert(1)</script>'>Invalid</Button>
      )
      const button = screen.getByRole('button', { name: 'Invalid' })
      expect(button).toBeInTheDocument()
      expect(button.tagName).toBe('BUTTON')
    })

    it('should reject vbscript: protocol', () => {
      render(<Button href='vbscript:alert(1)'>Invalid</Button>)
      const button = screen.getByRole('button', { name: 'Invalid' })
      expect(button).toBeInTheDocument()
      expect(button.tagName).toBe('BUTTON')
    })

    it('should reject file: protocol', () => {
      render(<Button href='file:///path/to/file'>Invalid</Button>)
      const button = screen.getByRole('button', { name: 'Invalid' })
      expect(button).toBeInTheDocument()
      expect(button.tagName).toBe('BUTTON')
    })

    it('should reject about: protocol', () => {
      render(<Button href='about:blank'>Invalid</Button>)
      const button = screen.getByRole('button', { name: 'Invalid' })
      expect(button).toBeInTheDocument()
      expect(button.tagName).toBe('BUTTON')
    })

    it('should render as button for invalid URLs in dev mode', () => {
      const originalEnv = import.meta.env.DEV
      Object.defineProperty(import.meta, 'env', {
        value: { ...import.meta.env, DEV: true },
        writable: true,
      })

      render(<Button href='javascript:alert(1)'>Invalid</Button>)
      const button = screen.getByRole('button', { name: 'Invalid' })
      expect(button).toBeInTheDocument()
      expect(button.tagName).toBe('BUTTON')
      expect(console.warn).toHaveBeenCalled()

      Object.defineProperty(import.meta, 'env', {
        value: { ...import.meta.env, DEV: originalEnv },
        writable: true,
      })
    })

    it('should render as button for invalid URLs', () => {
      render(<Button href='javascript:alert(1)'>Invalid</Button>)
      const button = screen.getByRole('button', { name: 'Invalid' })
      expect(button).toBeInTheDocument()
      expect(button.tagName).toBe('BUTTON')
    })

    it('should handle URLs with invalid protocols', () => {
      // URL with protocol that is not http or https
      render(<Button href='ftp://example.com'>Link</Button>)
      const button = screen.getByRole('button', { name: 'Link' })
      expect(button).toBeInTheDocument()
      expect(button.tagName).toBe('BUTTON')
    })

    it('should handle invalid URL format that throws error', () => {
      // URL that will throw error when parsed with new URL()
      // Using a malformed URL that cannot be parsed
      render(<Button href='http://[invalid'>Invalid</Button>)
      const button = screen.getByRole('button', { name: 'Invalid' })
      expect(button).toBeInTheDocument()
      expect(button.tagName).toBe('BUTTON')
    })

    it('should render as button with loading state for invalid URLs', () => {
      render(
        <Button href='javascript:alert(1)' loading>
          Invalid
        </Button>
      )
      const button = screen.getByRole('button', { name: 'Invalid' })
      expect(button).toBeInTheDocument()
      expect(button).toBeDisabled()
      expect(button).toHaveAttribute('aria-busy', 'true')
      expect(button).toHaveAttribute('aria-live', 'polite')
    })

    it('should render as button with disabled state for invalid URLs', () => {
      render(
        <Button href='javascript:alert(1)' disabled>
          Invalid
        </Button>
      )
      const button = screen.getByRole('button', { name: 'Invalid' })
      expect(button).toBeInTheDocument()
      expect(button).toBeDisabled()
    })

    it('should handle invalid URLs with both loading and disabled', () => {
      render(
        <Button href='javascript:alert(1)' loading disabled>
          Invalid
        </Button>
      )
      const button = screen.getByRole('button', { name: 'Invalid' })
      expect(button).toBeInTheDocument()
      expect(button).toBeDisabled()
    })
  })

  describe('Variants', () => {
    it('should render with primary variant', () => {
      render(<Button variant='primary'>Primary</Button>)
      const button = screen.getByRole('button', { name: 'Primary' })
      expect(button).toBeInTheDocument()
    })

    it('should render with outline variant', () => {
      render(<Button variant='outline'>Outline</Button>)
      const button = screen.getByRole('button', { name: 'Outline' })
      expect(button).toBeInTheDocument()
    })

    it('should render with ghost variant', () => {
      render(<Button variant='ghost'>Ghost</Button>)
      const button = screen.getByRole('button', { name: 'Ghost' })
      expect(button).toBeInTheDocument()
    })
  })

  describe('Sizes', () => {
    it('should render with default size', () => {
      render(<Button>Default</Button>)
      const button = screen.getByRole('button', { name: 'Default' })
      expect(button).toBeInTheDocument()
    })

    it('should render with small size', () => {
      render(<Button size='sm'>Small</Button>)
      const button = screen.getByRole('button', { name: 'Small' })
      expect(button).toBeInTheDocument()
    })

    it('should render with large size', () => {
      render(<Button size='lg'>Large</Button>)
      const button = screen.getByRole('button', { name: 'Large' })
      expect(button).toBeInTheDocument()
    })

    it('should render with icon size', () => {
      render(<Button size='icon'>Icon</Button>)
      const button = screen.getByRole('button', { name: 'Icon' })
      expect(button).toBeInTheDocument()
    })
  })

  describe('Interactions', () => {
    it('should call onClick when clicked', async () => {
      const user = userEvent.setup()
      render(<Button onClick={mockOnClick}>Click me</Button>)

      const button = screen.getByRole('button', { name: 'Click me' })
      await user.click(button)

      expect(mockOnClick).toHaveBeenCalledTimes(1)
    })

    it('should be disabled when disabled prop is true', () => {
      render(<Button disabled>Disabled</Button>)
      const button = screen.getByRole('button', { name: 'Disabled' })
      expect(button).toBeDisabled()
    })

    it('should be disabled when loading', () => {
      render(<Button loading>Loading</Button>)
      const button = screen.getByRole('button', { name: 'Loading' })
      expect(button).toBeDisabled()
    })
  })

  describe('Anchor props', () => {
    it('should pass target and rel to anchor', () => {
      render(
        <Button
          href='https://example.com'
          target='_blank'
          rel='noopener noreferrer'
        >
          Link
        </Button>
      )
      const link = screen.getByRole('link', { name: 'Link' })
      expect(link).toHaveAttribute('target', '_blank')
      expect(link).toHaveAttribute('rel', 'noopener noreferrer')
    })
  })
})
