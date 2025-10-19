import * as React from 'react'
import { cn } from '../../lib/cn'

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'ghost'
}

export const Button = React.forwardRef<HTMLButtonElement, Props>(
  ({ className, variant = 'primary', ...props }, ref) => {
    const base = 'btn'
    const variants = {
      primary: 'btn-primary',
      ghost: 'btn-ghost',
    }
    return (
      <button
        ref={ref}
        className={cn(base, variants[variant], className)}
        {...props}
      />
    )
  },
)
Button.displayName = 'Button'
