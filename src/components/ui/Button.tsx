"use client";

import { cn } from "@/lib/utils";
import { motion, HTMLMotionProps } from "framer-motion";
import { ReactNode } from "react";

interface ButtonProps extends HTMLMotionProps<"button"> {
    variant?: "primary" | "secondary" | "outline" | "ghost";
    size?: "sm" | "md" | "lg";
    children: ReactNode;
    className?: string;
}

export function Button({
    variant = "primary",
    size = "md",
    children,
    className,
    ...props
}: ButtonProps) {
    const variants = {
        primary:
            "bg-primary text-white hover:bg-primary/90 shadow-[0_0_15px_rgba(37,99,235,0.5)] border border-primary/50",
        secondary:
            "bg-accent text-black hover:bg-accent/90 shadow-[0_0_15px_rgba(0,255,157,0.5)] border border-accent/50",
        outline:
            "bg-transparent border border-white/20 text-white hover:bg-white/10 hover:border-primary/50",
        ghost: "bg-transparent text-white/70 hover:text-white hover:bg-white/5",
    };

    const sizes = {
        sm: "px-3 py-1.5 text-sm",
        md: "px-6 py-3 text-base",
        lg: "px-8 py-4 text-lg",
    };

    return (
        <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={cn(
                "relative rounded-md font-medium transition-colors flex items-center justify-center gap-2",
                variants[variant],
                sizes[size],
                className
            )}
            {...props}
        >
            {children}
        </motion.button>
    );
}
