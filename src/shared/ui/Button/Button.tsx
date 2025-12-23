import * as React from 'react'
import { cva } from 'class-variance-authority'
import { cn } from '@/shared/lib/utils'

/**
 * Button variant types
 */
export type ButtonVariant = 'primary' | 'outline' | 'ghost'

/**
 * Button size types
 */
export type ButtonSize = 'default' | 'sm' | 'lg' | 'icon'

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md text-base font-medium leading-[100%] tracking-normal text-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-modal focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed',
  {
    variants: {
      variant: {
        primary:
          'bg-btn-primary-bg text-btn-primary-color hover:opacity-90 active:opacity-80 shadow-sm hover:shadow-md transition-all duration-200 rounded-[12px]',
        outline:
          'border-2 border-text-default text-text-default bg-transparent hover:bg-text-default hover:text-bg-content',
        ghost: 'hover:bg-bg-app hover:text-text-default',
      },
      size: {
        default: 'h-10 px-6 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
    },
  }
)

interface ButtonLoaderProps {
  className?: string
}

const ButtonLoader: React.FC<ButtonLoaderProps> = ({ className }) => {
  return (
    <span
      className={cn(
        'h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin',
        className
      )}
      aria-hidden='true'
    />
  )
}

/**
 * Button component props when rendered as button
 */
export interface ButtonPropsAsButton
  extends Omit<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    'variant' | 'size'
  > {
  variant?: ButtonVariant
  size?: ButtonSize
  loading?: boolean
  href?: never
  target?: never
  rel?: never
}

/**
 * Button component props when rendered as anchor
 */
export interface ButtonPropsAsAnchor
  extends Omit<
    React.AnchorHTMLAttributes<HTMLAnchorElement>,
    'variant' | 'size'
  > {
  variant?: ButtonVariant
  size?: ButtonSize
  loading?: boolean
  disabled?: boolean
  href: string
  target?: string
  rel?: string
}

/**
 * Button component props
 * @property variant - Button style variant (primary, outline, ghost)
 * @property size - Button size (default, sm, lg, icon)
 * @property href - If provided, renders as anchor tag instead of button
 * @property target - Anchor target attribute (used with href)
 * @property rel - Anchor rel attribute (used with href)
 */
export type ButtonProps = ButtonPropsAsButton | ButtonPropsAsAnchor

const isValidUrl = (url: string): boolean => {
  if (url.startsWith('/') || url.startsWith('#') || url.startsWith('?')) {
    return true
  }

  const ALLOWED_PROTOCOLS = ['http:', 'https:', 'mailto:', 'tel:'] as const

  const DANGEROUS_PROTOCOLS = [
    'javascript:',
    'data:',
    'vbscript:',
    'file:',
    'about:',
  ] as const

  const urlLower = url.toLowerCase().trim()

  for (const dangerous of DANGEROUS_PROTOCOLS) {
    if (urlLower.startsWith(dangerous)) {
      return false
    }
  }

  try {
    const parsedUrl = new URL(url, 'http://localhost')

    return ALLOWED_PROTOCOLS.includes(
      parsedUrl.protocol as (typeof ALLOWED_PROTOCOLS)[number]
    )
  } catch {
    return false
  }
}

const Button = React.forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  ButtonProps
>(
  (
    { className, variant, size, href, target, rel, loading = false, ...props },
    ref
  ) => {
    const buttonClassName = cn(buttonVariants({ variant, size }), className)
    const commonProps = {
      className: buttonClassName,
    }

    const renderContent = (children: React.ReactNode) => (
      <>
        {loading && <ButtonLoader className='mr-2' />}
        {children}
      </>
    )

    if (href) {
      const isUrlValid = isValidUrl(href)

      if (!isUrlValid) {
        if (import.meta.env.DEV) {
          console.warn(
            `Button: Invalid or unsafe URL "${href}". Only http, https, and relative paths are allowed.`
          )
        }

        const buttonProps =
          props as React.ButtonHTMLAttributes<HTMLButtonElement>
        const { children, disabled, ...restButtonProps } = buttonProps

        return (
          <button
            {...commonProps}
            ref={ref as React.ForwardedRef<HTMLButtonElement>}
            disabled={loading || disabled}
            aria-busy={loading}
            aria-live={loading ? 'polite' : undefined}
            {...restButtonProps}
          >
            {renderContent(children)}
          </button>
        )
      }

      const anchorProps = props as React.AnchorHTMLAttributes<HTMLAnchorElement>
      const { children, ...restAnchorProps } = anchorProps

      return (
        <a
          {...commonProps}
          href={href}
          target={target}
          rel={rel}
          ref={ref as React.ForwardedRef<HTMLAnchorElement>}
          {...restAnchorProps}
        >
          {renderContent(children)}
        </a>
      )
    }

    const buttonProps = props as React.ButtonHTMLAttributes<HTMLButtonElement>
    const { children, disabled, ...restButtonProps } = buttonProps

    return (
      <button
        {...commonProps}
        ref={ref as React.ForwardedRef<HTMLButtonElement>}
        disabled={loading || disabled}
        aria-busy={loading}
        aria-live={loading ? 'polite' : undefined}
        {...restButtonProps}
      >
        {renderContent(children)}
      </button>
    )
  }
)
Button.displayName = 'Button'

export default Button
