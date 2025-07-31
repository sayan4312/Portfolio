import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-glow-primary hover:shadow-glow-intense hover:scale-105",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-border bg-background/50 backdrop-blur-sm shadow-glow-soft hover:bg-primary/10 hover:border-primary/50 hover:shadow-glow-primary",
        secondary:
          "bg-gradient-secondary text-secondary-foreground shadow-glow-secondary hover:shadow-glow-intense hover:scale-105",
        ghost: "hover:bg-primary/10 hover:text-primary-glow",
        link: "text-primary-glow underline-offset-4 hover:underline hover:text-primary",
        glow: "bg-gradient-primary text-primary-foreground shadow-glow-primary hover:shadow-glow-intense hover:scale-105 animate-pulse-glow",
        glass: "bg-card-glass backdrop-blur-sm border border-border/30 text-foreground shadow-glow-soft hover:bg-primary/20 hover:border-primary/50 hover:shadow-glow-primary",
        hero: "bg-gradient-primary text-primary-foreground shadow-glow-intense hover:shadow-glow-primary hover:scale-110 text-lg font-semibold",
      },
      size: {
        default: "h-10 px-6 py-2",
        sm: "h-8 rounded-md px-4 text-xs",
        lg: "h-12 rounded-lg px-8 text-base",
        icon: "h-10 w-10",
        hero: "h-14 px-10 py-4 text-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
