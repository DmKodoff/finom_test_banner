import * as React from 'react'
import { cn } from '@/shared/lib/utils'

/**
 * Text component props
 * @property as - HTML element to render (p, span, div). Default: 'p'
 * @property variant - Text color variant (default, light). Default: 'default'
 */
export interface TextProps extends React.HTMLAttributes<HTMLElement> {
  as?: 'p' | 'span' | 'div'
  variant?: 'default' | 'light'
}

const Text = React.forwardRef<
  HTMLParagraphElement | HTMLSpanElement | HTMLDivElement,
  TextProps
>(({ className, as: Component = 'p', variant = 'default', ...props }, ref) => {
  const baseClassName = cn(
    'text-base font-normal leading-6',
    variant === 'default' ? 'text-text-default' : 'text-text-light',
    className
  )

  if (Component === 'span') {
    return (
      <span
        ref={ref as React.ForwardedRef<HTMLSpanElement>}
        className={baseClassName}
        {...(props as React.HTMLAttributes<HTMLSpanElement>)}
      />
    )
  }

  if (Component === 'div') {
    return (
      <div
        ref={ref as React.ForwardedRef<HTMLDivElement>}
        className={baseClassName}
        {...(props as React.HTMLAttributes<HTMLDivElement>)}
      />
    )
  }

  return (
    <p
      ref={ref as React.ForwardedRef<HTMLParagraphElement>}
      className={baseClassName}
      {...(props as React.HTMLAttributes<HTMLParagraphElement>)}
    />
  )
})

Text.displayName = 'Text'

export { Text }
export default Text
