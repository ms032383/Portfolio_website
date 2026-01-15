"use client";

import { achievements } from "@/lib/data";
import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { Trophy, Award } from "lucide-react";

export function Achievements() {
    return (
        <Section id="achievements" className="relative">
            <div className="flex flex-col gap-4 mb-16 text-center">
                <h2 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/50">
                    Achievements
                </h2>
                <div className="w-20 h-1 bg-accent mx-auto rounded-full" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                {achievements.map((item, index) => (
                    <Card
                        key={item.id}
                        gradient
                        className="flex items-start gap-4 hover:scale-[1.02] transition-transform duration-300"
                    >
                        <div className="p-3 rounded-full bg-accent/10 text-accent shrink-0">
                            {index === 0 ? <Trophy size={24} /> : <Award size={24} />}
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                            <p className="text-white/60">{item.description}</p>
                        </div>
                    </Card>
                ))}
            </div>
        </Section>
    );
}
