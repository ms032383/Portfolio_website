"use client";

import { personalInfo } from "@/lib/data";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { motion } from "framer-motion";
import { ArrowRight, Download, Smartphone, Globe } from "lucide-react";
import Link from "next/link";

export function Hero() {
    return (
        <Section className="min-h-screen flex items-center justify-center pt-20 relative overflow-hidden">
            {/* Background Ambience */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[128px] pointer-events-none -z-10" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-[128px] pointer-events-none -z-10" />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
                {/* Left Column: Text */}
                <div className="text-center lg:text-left space-y-6">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="inline-block px-3 py-1 rounded-full bg-white/5 border border-white/10 text-primary text-sm font-mono mb-4"
                    >
                        Hello, World! I am
                    </motion.div>

                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-4">
                        <span className="glitch-text" data-text={personalInfo.name}>
                            {personalInfo.name}
                        </span>
                    </h1>

                    <div className="h-16 md:h-20 overflow-hidden">
                        <motion.div
                            initial={{ y: "100%" }}
                            animate={{ y: 0 }}
                            transition={{ delay: 0.5, type: "spring", stiffness: 100 }}
                            className="text-2xl md:text-4xl font-mono text-white/80"
                        >
                            <span className="text-accent">&gt;</span> {personalInfo.title}
                        </motion.div>
                    </div>

                    <p className="text-lg text-white/60 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                        {personalInfo.tagline}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
                        <Link href="#projects">
                            <Button size="lg" className="group">
                                View Projects
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </Link>
                        <Link href="/resume.pdf" target="_blank">
                            <Button size="lg" variant="outline">
                                Download Resume
                                <Download className="w-4 h-4 ml-2" />
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Right Column: Visual Animation */}
                <div className="relative h-[400px] w-full hidden lg:flex items-center justify-center">
                    {/* Abstract Tech Visual */}
                    <motion.div
                        animate={{
                            rotateY: [0, 360],
                            rotateX: [0, 30, 0]
                        }}
                        transition={{
                            duration: 20,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                        className="relative w-64 h-64 md:w-80 md:h-80 perspective-1000 transform-style-3d"
                    >
                        {/* Central Core */}
                        <div className="absolute inset-0 bg-black/50 border border-primary/50 rounded-xl backdrop-blur-sm flex items-center justify-center transform translate-z-10 animate-pulse">
                            <Smartphone size={64} className="text-primary" />
                        </div>

                        {/* Floating Elements */}
                        <motion.div
                            animate={{ y: [-20, 20, -20] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute -top-12 -right-12 p-4 bg-black/80 border border-accent/50 rounded-lg backdrop-blur-md shadow-[0_0_20px_rgba(0,255,157,0.2)]"
                        >
                            <Globe size={32} className="text-accent" />
                        </motion.div>

                        <motion.div
                            animate={{ y: [20, -20, 20] }}
                            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                            className="absolute -bottom-8 -left-8 p-4 bg-black/80 border border-primary/50 rounded-lg backdrop-blur-md shadow-[0_0_20px_rgba(37,99,235,0.2)]"
                        >
                            <div className="font-mono text-xs text-primary">
                                npm install<br />success
                            </div>
                        </motion.div>

                        {/* Orbit Rings */}
                        <div className="absolute inset-[-40px] rounded-full border border-white/5 border-dashed animate-[spin_10s_linear_infinite]" />
                        <div className="absolute inset-[-80px] rounded-full border border-white/5 border-dashed animate-[spin_15s_linear_infinite_reverse]" />
                    </motion.div>
                </div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: 2 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/20"
            >
                <div className="w-6 h-10 border-2 border-current rounded-full flex justify-center p-1">
                    <div className="w-1 h-3 bg-current rounded-full" />
                </div>
            </motion.div>
        </Section>
    );
}
