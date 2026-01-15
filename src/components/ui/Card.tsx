"use client";

import { cn } from "@/lib/utils";
import { motion, HTMLMotionProps } from "framer-motion";
import { ReactNode } from "react";

interface CardProps extends HTMLMotionProps<"div"> {
    children: ReactNode;
    className?: string;
    gradient?: boolean;
}

export function Card({
    children,
    className,
    gradient = false,
    ...props
}: CardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={cn(
                "relative overflow-hidden rounded-xl bg-white/5 p-6 backdrop-blur-md border border-white/10",
                gradient &&
                "bg-gradient-to-br from-white/5 to-white/0 border-t-white/10 border-l-white/10",
                className
            )}
            {...props}
        >
            {gradient && (
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/5 opacity-0 transition-opacity hover:opacity-100 pointer-events-none" />
            )}
            {children}
        </motion.div>
    );
}
