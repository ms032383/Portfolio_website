"use client";

import { useAdmin } from "@/context/AdminContext";
import { useState } from "react";
import { Trophy, Plus, Trash2, Award } from "lucide-react";
import { Achievement } from "@/lib/types";

export function HallOfFame() {
    const { data, addAchievement, deleteAchievement } = useAdmin();
    const [newAchievement, setNewAchievement] = useState<Partial<Achievement>>({ title: "", description: "" });

    const handleAdd = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newAchievement.title || !newAchievement.description) return;

        const newItem: Achievement = {
            id: `ach-${Date.now()}`, // ID will be ignored or regen by DB if we don't pass it, but for optimistic UI we might need it. 
            // Actually service handles INSERT.
            title: newAchievement.title,
            description: newAchievement.description
        };

        await addAchievement(newItem);
        setNewAchievement({ title: "", description: "" });
    };

    const handleDelete = async (id: string) => {
        if (confirm("Remove this achievement?")) {
            await deleteAchievement(id);
        }
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Form */}
            <div className="lg:col-span-1">
                <div className="bg-white/5 border border-white/5 rounded-xl p-6 sticky top-24">
                    <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                        <Award className="text-yellow-500" size={20} />
                        New Entry
                    </h3>
                    <form onSubmit={handleAdd} className="space-y-4">
                        <div>
                            <label className="text-xs font-bold text-white/40 uppercase block mb-1">Title</label>
                            <input
                                className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white focus:border-yellow-500/50 outline-none placeholder-white/20"
                                placeholder="e.g. 1st Place Hackathon"
                                value={newAchievement.title}
                                onChange={e => setNewAchievement(prev => ({ ...prev, title: e.target.value }))}
                                required
                            />
                        </div>
                        <div>
                            <label className="text-xs font-bold text-white/40 uppercase block mb-1">Description</label>
                            <textarea
                                className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white focus:border-yellow-500/50 outline-none min-h-[120px] placeholder-white/20"
                                placeholder="Details about the achievement..."
                                value={newAchievement.description}
                                onChange={e => setNewAchievement(prev => ({ ...prev, description: e.target.value }))}
                                required
                            />
                        </div>
                        <button className="w-full bg-yellow-600 hover:bg-yellow-500 text-white font-bold py-3 rounded-xl transition-colors shadow-lg shadow-yellow-500/10 flex items-center justify-center gap-2">
                            <Plus size={18} />
                            Add to Hall of Fame
                        </button>
                    </form>
                </div>
            </div>

            {/* List */}
            <div className="lg:col-span-2 space-y-4">
                {data.achievements.map((item, index) => (
                    <div key={item.id} className="bg-white/5 border border-white/5 rounded-xl p-6 flex items-start gap-4 hover:border-yellow-500/30 transition-colors group">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-500/20 to-orange-500/20 flex items-center justify-center border border-yellow-500/20 text-yellow-500 font-bold font-mono">
                            #{data.achievements.length - index}
                        </div>
                        <div className="flex-1">
                            <h4 className="text-lg font-bold text-white">{item.title}</h4>
                            <p className="text-white/60 text-sm mt-1 leading-relaxed">{item.description}</p>
                        </div>
                        <button
                            onClick={() => handleDelete(item.id)}
                            className="p-2 text-white/20 hover:text-red-400 hover:bg-white/5 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                        >
                            <Trash2 size={18} />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
