"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";

const navItems = [
    { name: "About", href: "#about" },
    { name: "Experience", href: "#experience" },
    { name: "Projects", href: "#projects" },
    { name: "Achievements", href: "#achievements" },
    { name: "Contact", href: "#contact" },
];

export function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <motion.header
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300 backdrop-blur-md",
                scrolled ? "bg-black/80 border-b border-white/5 py-4" : "bg-transparent py-6"
            )}
        >
            <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="text-xl font-bold font-mono tracking-tighter">
                    <span className="text-primary">&lt;</span>
                    Mohan
                    <span className="text-accent">Singh</span>
                    <span className="text-primary">/&gt;</span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex gap-8">
                    {navItems.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className="text-sm font-medium text-white/70 hover:text-primary transition-colors hover:scale-105 transform inline-block"
                        >
                            {item.name}
                        </Link>
                    ))}
                    <Link
                        href="/resume.pdf"
                        className="px-4 py-2 text-sm font-medium bg-primary/10 text-primary border border-primary/20 rounded-md hover:bg-primary/20 transition-colors"
                        target="_blank"
                    >
                        Resume
                    </Link>
                </nav>

                {/* Mobile Toggle */}
                <button
                    className="md:hidden text-white"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="md:hidden bg-black/95 border-b border-white/10"
                >
                    <nav className="flex flex-col p-6 gap-4">
                        {navItems.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="text-lg font-medium text-white/80 hover:text-primary"
                                onClick={() => setIsOpen(false)}
                            >
                                {item.name}
                            </Link>
                        ))}
                        <Link
                            href="/resume.pdf"
                            className="px-4 py-2 text-center font-medium bg-primary/10 text-primary border border-primary/20 rounded-md hover:bg-primary/20 transition-colors"
                            target="_blank"
                            onClick={() => setIsOpen(false)}
                        >
                            Resume
                        </Link>
                    </nav>
                </motion.div>
            )}
        </motion.header>
    );
}
