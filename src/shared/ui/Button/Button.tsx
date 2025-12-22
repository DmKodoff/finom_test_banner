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

const Button = React.forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  ButtonProps
>(
  (
    { className, variant, size, href, target, rel, loading = false, ...props },
    ref
  ) => {
    if (href) {
      const anchorProps = props as React.AnchorHTMLAttributes<HTMLAnchorElement>
      const { children, ...restAnchorProps } = anchorProps

      return (
        <a
          href={href}
          target={target}
          rel={rel}
          className={cn(buttonVariants({ variant, size, className }))}
          ref={ref as React.ForwardedRef<HTMLAnchorElement>}
          aria-busy={loading}
          {...restAnchorProps}
        >
          {loading && <ButtonLoader className='mr-2' />}
          {children}
        </a>
      )
    }

    const buttonProps = props as React.ButtonHTMLAttributes<HTMLButtonElement>
    const { children, disabled, ...restButtonProps } = buttonProps

    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref as React.ForwardedRef<HTMLButtonElement>}
        disabled={loading || disabled}
        aria-busy={loading}
        {...restButtonProps}
      >
        {loading && <ButtonLoader className='mr-2' />}
        {children}
      </button>
    )
  }
)
Button.displayName = 'Button'

export default Button
