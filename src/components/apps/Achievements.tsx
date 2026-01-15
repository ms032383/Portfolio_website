"use client";

import { achievements, personalInfo } from "@/lib/data";
import { Trophy, Award, Medal, Star, Cpu, Code } from "lucide-react";

export function AchievementsContent() {
    return (
        <div className="h-full bg-gradient-to-br from-[#121212] to-[#1e1e2e] p-6 text-white overflow-y-auto custom-scrollbar">
            {/* Header / Stats */}
            <div className="mb-8 p-6 rounded-2xl bg-gradient-to-r from-yellow-600/20 to-orange-600/20 border border-yellow-500/20 flex flex-col md:flex-row items-center justify-between gap-6 backdrop-blur-sm">
                <div className="flex items-center gap-4">
                    <div className="p-4 bg-yellow-500/20 rounded-full border border-yellow-500/50 shadow-[0_0_15px_rgba(234,179,8,0.3)]">
                        <Trophy size={32} className="text-yellow-400" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-white tracking-tight">Hall of Fame</h1>
                        <p className="text-white/60 text-sm">Recognitions & Competitive Programming</p>
                    </div>
                </div>

                <div className="flex gap-4">
                    <div className="text-center px-4 border-r border-white/10">
                        <div className="text-2xl font-bold text-white">{personalInfo.stats.leetcode.split(" ")[0]}</div>
                        <div className="text-xs text-white/40 font-mono uppercase tracking-wider">Rating</div>
                    </div>
                    <div className="text-center px-4">
                        <div className="text-2xl font-bold text-white">{personalInfo.stats.problemsSolved}</div>
                        <div className="text-xs text-white/40 font-mono uppercase tracking-wider">Solved</div>
                    </div>
                </div>
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                {/* LeetCode Card */}
                <div className="bg-[#18181b] rounded-xl p-6 border border-white/5 relative overflow-hidden group hover:border-white/10 transition-colors">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <Code size={100} />
                    </div>
                    <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                        <Cpu className="text-blue-400" size={20} />
                        LeetCode Stats
                    </h2>
                    <div className="space-y-4 relative z-10">
                        <div>
                            <div className="flex justify-between mb-1">
                                <span className="text-sm text-slate-400">Global Ranking</span>
                                <span className="text-sm text-blue-400 font-bold">Top 39%</span>
                            </div>
                            <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                                <div className="h-full bg-blue-500 w-[61%]" />
                            </div>
                        </div>
                        <div className="grid grid-cols-3 gap-2 mt-4 text-center">
                            <div className="bg-white/5 rounded p-2">
                                <div className="text-cyan-400 font-bold">120</div>
                                <div className="text-[10px] text-slate-500 uppercase">Easy</div>
                            </div>
                            <div className="bg-white/5 rounded p-2">
                                <div className="text-yellow-400 font-bold">150</div>
                                <div className="text-[10px] text-slate-500 uppercase">Med</div>
                            </div>
                            <div className="bg-white/5 rounded p-2">
                                <div className="text-red-400 font-bold">30</div>
                                <div className="text-[10px] text-slate-500 uppercase">Hard</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Hackathons & Awards */}
                <div className="space-y-4">
                    {achievements.map((item, index) => (
                        <div key={item.id} className="bg-[#18181b] p-5 rounded-xl border border-white/5 flex items-start gap-4 hover:border-yellow-500/30 transition-all hover:translate-x-1 cursor-default group">
                            <div className="shrink-0 mt-1">
                                {index === 0 ? <Trophy className="text-yellow-400" size={24} /> : <Medal className="text-slate-400 group-hover:text-white" size={24} />}
                            </div>
                            <div>
                                <h3 className="text-white font-bold text-base group-hover:text-yellow-400 transition-colors">{item.title}</h3>
                                <p className="text-slate-400 text-sm mt-1 leading-relaxed border-l-2 border-white/10 pl-3 group-hover:border-yellow-500/50 transition-colors">
                                    {item.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
