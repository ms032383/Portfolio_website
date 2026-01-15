"use client";

import { cn } from "@/lib/utils";
import { motion, HTMLMotionProps } from "framer-motion";
import { ReactNode } from "react";

interface SectionProps extends HTMLMotionProps<"section"> {
    children: ReactNode;
    className?: string;
    id?: string;
}

export function Section({ children, className, id, ...props }: SectionProps) {
    return (
        <motion.section
            id={id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className={cn("py-20 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto", className)}
            {...props}
        >
            {children}
        </motion.section>
    );
}
