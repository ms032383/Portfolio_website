"use client";

import { useAdmin } from "@/context/AdminContext";
import { useState } from "react";
import { Plus, Package, Box, Trash2, Save } from "lucide-react";

export function TechStack() {
    const { data, addSkillCategory, addSkillItem, deleteSkillItem, deleteSkillCategory } = useAdmin();
    const [newCategory, setNewCategory] = useState("");
    const [newItem, setNewItem] = useState({ category: "", name: "" });

    const handleAddCategory = async () => {
        if (!newCategory.trim()) return;
        await addSkillCategory(newCategory);
        setNewCategory("");
    };

    const handleDeleteCategory = async (idx: number) => {
        if (confirm("Delete this entire category and its skills?")) {
            await deleteSkillCategory(idx);
        }
    };

    const handleAddItem = async (categoryIndex: number) => {
        const item = newItem.name.trim();
        if (!item) return;

        // Since we are using index on frontend but category name on backend, we need the category name
        const categoryName = data.skills[categoryIndex].category;
        await addSkillItem(categoryName, item);
        setNewItem({ category: "", name: "" });
    };

    const handleDeleteItem = async (categoryIndex: number, itemIndex: number) => {
        const categoryName = data.skills[categoryIndex].category;
        const itemName = data.skills[categoryIndex].items[itemIndex];
        await deleteSkillItem(categoryName, itemName);
    };

    return (
        <div className="space-y-6">
            <div className="bg-white/5 border border-white/5 rounded-xl p-6">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                    <Package size={20} className="text-purple-400" />
                    Package Manager (Skills)
                </h3>

                {/* Add Category */}
                <div className="flex gap-2 max-w-md mb-8">
                    <input
                        className="flex-1 bg-black/40 border border-white/10 rounded-lg px-4 py-2 text-sm text-white focus:border-primary/50 outline-none"
                        placeholder="New Category (e.g. 'Blockchain')"
                        value={newCategory}
                        onChange={e => setNewCategory(e.target.value)}
                    />
                    <button
                        onClick={handleAddCategory}
                        className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg text-sm font-bold transition-colors"
                    >
                        <Plus size={16} />
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {data.skills.map((skillGroup, catIdx) => (
                        <div key={catIdx} className="bg-black/20 border border-white/10 rounded-xl overflow-hidden flex flex-col">
                            <div className="p-4 border-b border-white/5 bg-white/5 flex justify-between items-center group">
                                <h4 className="font-mono text-sm font-bold text-primary uppercase">{skillGroup.category}</h4>
                                <button onClick={() => handleDeleteCategory(catIdx)} className="text-white/20 hover:text-red-400 transition-colors">
                                    <Trash2 size={14} />
                                </button>
                            </div>

                            <div className="p-4 flex-1 space-y-2">
                                {skillGroup.items.map((item, itemIdx) => (
                                    <div key={itemIdx} className="flex justify-between items-center bg-white/5 px-3 py-2 rounded border border-white/5 group">
                                        <div className="flex items-center gap-2">
                                            <Box size={14} className="text-white/40" />
                                            <span className="text-sm text-white/80">{item}</span>
                                        </div>
                                        <button onClick={() => handleDeleteItem(catIdx, itemIdx)} className="opacity-0 group-hover:opacity-100 text-white/20 hover:text-red-400 transition-all">
                                            <XIcon />
                                        </button>
                                    </div>
                                ))}
                                {skillGroup.items.length === 0 && (
                                    <div className="text-center text-xs text-white/20 py-4 italic">Empty package</div>
                                )}
                            </div>

                            <div className="p-2 border-t border-white/5 bg-white/5">
                                <form
                                    onSubmit={(e) => {
                                        e.preventDefault();
                                        handleAddItem(catIdx);
                                    }}
                                    className="flex gap-2"
                                >
                                    <input
                                        className="flex-1 bg-black/40 border border-white/5 rounded px-2 py-1.5 text-xs text-white focus:border-primary/50 outline-none"
                                        placeholder="Add dependency..."
                                        value={newItem.category === skillGroup.category ? newItem.name : ""}
                                        onFocus={() => setNewItem({ ...newItem, category: skillGroup.category })}
                                        onChange={e => setNewItem({ category: skillGroup.category, name: e.target.value })}
                                    />
                                    <button type="submit" className="text-white/40 hover:text-primary transition-colors pr-2">
                                        <Plus size={14} />
                                    </button>
                                </form>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

function XIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 18 18" /></svg>
    )
}
