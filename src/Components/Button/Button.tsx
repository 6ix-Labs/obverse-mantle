import { VariantProps, cva } from "class-variance-authority";
import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

export const buttonStyles = cva(["transition-colors"], {
    variants: {
        variant: {
            default: ["bg-secondary"],
            ghost: ["hover:bg-gray-100"],
            dark: [
                "bg-secondary-dark",
                "hover:bg-secondary-dark-hover",
                "text-secondary",
            ],
            normal: ["bg-white"],
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
                "rounded-[12px]",
                "items-center",
                "justify-center",
                "flex",
                "px-6",
                "py-3",
                "font-figtree",
                "font-normal",
                "border",
                "text-gray-600"
            ]
        },
    },
    defaultVariants: {
        variant: "default",
        size: "default",
    }
})

type ButtonProps = VariantProps<typeof buttonStyles> & ComponentProps<"button"> & {
    href?: string
}

export function Button({variant, size, className, href, ...props}: ButtonProps) {
    if (href) {
        return (
            <a 
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={twMerge(buttonStyles({ variant, size }), className)}
            >
                {props.children}
            </a>
        )
    }
    
    return (
        <button 
            {...props}
            className={twMerge(buttonStyles({ variant, size }), className)}
        />
    )
}
