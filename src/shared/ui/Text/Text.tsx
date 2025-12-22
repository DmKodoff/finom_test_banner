import * as React from 'react'
import { cn } from '@/shared/lib/utils'

/**
 * Text component props
 * @property as - HTML element to render (p, span, div). Default: 'p'
 * @property variant - Text color variant (default, light). Default: 'default'
 */
export interface TextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  as?: 'p' | 'span' | 'div'
  variant?: 'default' | 'light'
}

const Text = React.forwardRef<HTMLParagraphElement, TextProps>(
  ({ className, as: Component = 'p', variant = 'default', ...props }, ref) => {
    return (
      <Component
        ref={ref}
        className={cn(
          'text-base font-normal leading-6',
          variant === 'default' ? 'text-text-default' : 'text-text-light',
          className
        )}
        {...props}
      />
    )
  }
)
Text.displayName = 'Text'

export { Text }
export default Text
