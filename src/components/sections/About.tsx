"use client";

import { personalInfo, skills } from "@/lib/data";
import { adminDataService } from "@/lib/adminData";
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { motion } from "framer-motion";
import { Code2, Database, Layout, PenTool, Award, ExternalLink } from "lucide-react";
import Link from "next/link";

export function About() {
    const [profile, setProfile] = useState<any>(personalInfo);

    useEffect(() => {
        const fetchProfile = async () => {
            const data = await adminDataService.getData();
            if (data.profile) setProfile(data.profile);
        };
        fetchProfile();
    }, []);

    return (
        <Section id="about" className="relative">
            <div className="flex flex-col gap-4 mb-16 text-center">
                <h2 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/50">
                    About Me
                </h2>
                <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Education & Bio - Spans 2 cols */}
                <Card className="md:col-span-2 row-span-1 min-h-[300px] flex flex-col justify-center gap-4">
                    <h3 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
                        <span className="text-primary">01.</span> Background
                    </h3>
                    <p className="text-white/70 leading-relaxed text-lg">
                        {profile.tagline}
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                        <div className="p-4 rounded-lg bg-white/5 border border-white/5">
                            <span className="text-sm text-white/40 block mb-1">LeetCode Rating</span>
                            <span className="text-xl font-mono text-accent">{profile.stats?.leetcode || "N/A"}</span>
                        </div>
                        <div className="p-4 rounded-lg bg-white/5 border border-white/5">
                            <span className="text-sm text-white/40 block mb-1">Problems Solved</span>
                            <span className="text-xl font-mono text-primary">{profile.stats?.problemsSolved || "N/A"}</span>
                        </div>
                    </div>
                </Card>

                {/* Quick Stats / Tech Stack Visual - Spans 1 col */}
                <Card gradient className="flex flex-col items-center justify-center text-center gap-4">
                    <div className="relative w-24 h-24">
                        <div className="absolute inset-0 bg-primary/20 rounded-full animate-ping" />
                        <div className="relative z-10 w-full h-full bg-black border border-primary text-primary rounded-full flex items-center justify-center">
                            <Code2 size={40} />
                        </div>
                    </div>
                    <div>
                        <h4 className="font-bold text-white">Full Stack</h4>
                        <p className="text-sm text-white/60">Mobile & Web Specialist</p>
                    </div>
                </Card>

                {/* Skills Grid - Spans full width layout underneath */}
                <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
                    {skills.map((skill, index) => {
                        const Icon = [Layout, Code2, Database, PenTool][index] || Code2;
                        return (
                            <Card key={skill.category} className="group hover:-translate-y-1 transition-transform duration-300">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="p-2 rounded-md bg-white/10 text-primary group-hover:text-accent transition-colors">
                                        <Icon size={20} />
                                    </div>
                                    <h4 className="font-bold text-white">{skill.category}</h4>
                                </div>
                                <ul className="space-y-2">
                                    {skill.items.map(item => (
                                        <li key={item} className="text-sm text-white/60 flex items-center gap-2">
                                            <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </Card>
                        )
                    })}
                </div>
            </div>
        </Section>
    );
}
