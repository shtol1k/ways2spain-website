import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { Icon } from '@/components/ui/icons'
import type { IconName } from '@/components/ui/icons/registry'

const calloutVariants = cva(
  'flex gap-4 items-start p-4 rounded-lg w-full',
  {
    variants: {
      variant: {
        info: 'bg-sky-50',
        warning: 'bg-amber-50',
        alert: 'bg-red-50',
        success: 'bg-green-50',
      },
    },
    defaultVariants: {
      variant: 'info',
    },
  }
)

const iconColorVariants = cva('', {
  variants: {
    variant: {
      info: 'color-content-info',
      warning: 'color-content-notice',
      alert: 'color-content-negative',
      success: 'color-content-positive',
    },
  },
  defaultVariants: {
    variant: 'info',
  },
})

const iconMap: Record<string, IconName> = {
  info: 'circleInfoSolid',
  warning: 'triangleExclamationSolid',
  alert: 'circleExclamationSolid',
  success: 'circleCheckSolid',
}

export interface CalloutProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof calloutVariants> {
  title?: string
}

const Callout = React.forwardRef<HTMLDivElement, CalloutProps>(
  ({ className, variant = 'info', title, children, ...props }, ref) => {
    const v = variant ?? 'info'
    return (
      <div
        ref={ref}
        role="alert"
        className={cn(calloutVariants({ variant }), className)}
        {...props}
      >
        <Icon name={iconMap[v]} size="lg" className={iconColorVariants({ variant })} />
        <div className="flex flex-col gap-1 min-w-0">
          {title && (
            <p className="font-medium text-body-base color-content-primary tracking-tight leading-6 m-0">
              {title}
            </p>
          )}
          <div className="text-body-base color-content-secondary [&_p]:leading-6 [&_p]:m-0">
            {children}
          </div>
        </div>
      </div>
    )
  }
)
Callout.displayName = 'Callout'

export { Callout, calloutVariants }
