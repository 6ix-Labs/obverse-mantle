"use client"

import { VariantProps, cva } from "class-variance-authority"
import { ComponentProps } from "react"
import { twMerge } from "tailwind-merge"

export const buttonStyles = cva(["transition-colors"], {
    variants: {
        variant: {
            default: ["bg-secondary"],
            ghost: ["hover:bg-opacity-1"],
            dark: [
                "bg-secondary-dark",
                "hover:bg-secondary-dark-hover",
                "text-secondary",
            ],
            normal: ["bg-primary"],
        },
        size: {
            default: ["p-5"],
            icon: [
                "rounded-full",
                "w-10",
                "h-10",
                "flex",
                "items-center",
                "justify-center",
                "p-2.5",
                
            ],
         normal: [
            "rounded-[40px]",
            "items-center",
            "justify-center",
            "flex",
            "px-8",
            "py-3",
            "font-onest",
            "font-normal",
            "border",
            "border-[#FFD5C9]",
            "text-[#131313]"
         ]
        },

    },
    defaultVariants: {
        variant: "default",
        size: "default",
    }
}


)
type ButtonProps = VariantProps<typeof buttonStyles> & ComponentProps<"button">
export function Button({variant, size, className, ...props}: ButtonProps) {
    return (
        <button 
        {...props}
         className={twMerge(buttonStyles({ variant, size }), className)}
        />
    )
}