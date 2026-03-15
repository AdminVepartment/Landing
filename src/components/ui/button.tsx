import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * Button — Vepartment minimal linear system.
 *
 * Rule: color lives on the border stroke only — never inside.
 * All text is foreground (white). Backgrounds are always transparent.
 * The accent appears only as a 1px border on the primary variant.
 * Solid is the single exception — filled only for the highest-priority CTA.
 */
const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2 whitespace-nowrap",
    "rounded-none text-sm font-medium",
    "transition-colors duration-100",
    "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background",
    "disabled:pointer-events-none disabled:opacity-30",
    "[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  ],
  {
    variants: {
      variant: {
        // Standard — monochrome 1px border, white text, no fill
        default:
          "border border-border bg-transparent text-foreground hover:border-foreground-dim",

        // Primary — accent 1px border only, text stays white
        primary:
          "border border-primary bg-transparent text-foreground hover:border-[#1FFF8F]",

        // Solid — filled accent, use only for highest-emphasis CTA
        solid:
          "border border-primary bg-primary text-primary-foreground hover:bg-primary/90",

        // Destructive — red 1px border, text stays white
        destructive:
          "border border-error/40 bg-transparent text-foreground hover:border-error",

        // Ghost — no border, no fill, just muted text
        ghost:
          "border border-transparent bg-transparent text-foreground-muted hover:text-foreground",

        // Link — text only
        link:
          "border-none bg-transparent text-foreground-muted underline-offset-4 hover:text-foreground hover:underline p-0 h-auto",

        // Aliases for backwards compatibility
        outline:   "border border-border bg-transparent text-foreground hover:border-foreground-dim",
        secondary: "border border-transparent bg-transparent text-foreground-muted hover:text-foreground",
      },
      size: {
        sm:      "h-7 px-3 text-xs",
        default: "h-8 px-4 text-sm",
        lg:      "h-9 px-6 text-sm",
        icon:    "h-8 w-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
