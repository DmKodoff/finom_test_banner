import * as React from 'react'
import { cn } from '@/shared/lib/utils'

/**
 * Title component props
 * @property as - HTML heading element to render (h1-h6). Default: 'h2'
 */
export interface TitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
}

const Title = React.forwardRef<HTMLHeadingElement, TitleProps>(
  ({ className, as: Component = 'h2', ...props }, ref) => {
    return (
      <Component
        ref={ref}
        className={cn(
          'text-[24px] font-semibold text-text-default leading-[28px]',
          className
        )}
        {...props}
      />
    )
  }
)
Title.displayName = 'Title'

export { Title }
export default Title
