"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { AdminData, adminDataService } from "@/lib/adminData";
import { Project, Skill, Achievement } from "@/lib/types";

interface AdminContextType {
    isAuthenticated: boolean;
    login: (password: string) => boolean;
    logout: () => void;
    data: AdminData;
    refreshData: () => Promise<void>;

    // Legacy support (optional, but better to migrate)
    // saveData: (newData: AdminData) => void; 

    // Granular Actions
    addProject: (p: Project) => Promise<void>;
    updateProject: (p: Project) => Promise<void>;
    deleteProject: (id: string) => Promise<void>;

    addSkillCategory: (category: string) => Promise<void>;
    // deleteSkillCategory: (category: string) => Promise<void>; // Harder without ID, defaulting to name match
    addSkillItem: (category: string, item: string) => Promise<void>;
    deleteSkillItem: (category: string, item: string) => Promise<void>;
    deleteSkillCategory: (idx: number) => Promise<void>; // Using index for now as UI does

    addAchievement: (a: Achievement) => Promise<void>;
    deleteAchievement: (id: string) => Promise<void>;

    addExperience: (e: any) => Promise<void>;
    deleteExperience: (id: string) => Promise<void>;

    updateProfile: (p: any) => Promise<void>;

    isLoading: boolean;
    saveData: (newData: AdminData) => void; // Keep for compatibility if needed, but prefer granular
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export function AdminProvider({ children }: { children: React.ReactNode }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [data, setData] = useState<AdminData>({ projects: [], skills: [], achievements: [], experiences: [], profile: {} as any });
    const [isLoading, setIsLoading] = useState(true);

    // Initial Load
    useEffect(() => {
        loadInitialData();

        // Check session storage for auth persistence
        const isAuth = sessionStorage.getItem("admin_auth") === "true";
        setIsAuthenticated(isAuth);
    }, []);

    const loadInitialData = async () => {
        setIsLoading(true);
        try {
            const freshData = await adminDataService.getData();
            setData(freshData);
        } catch (e) {
            console.error("Failed to load data", e);
        } finally {
            setIsLoading(false);
        }
    };

    const login = (password: string) => {
        // Mock Password: "root" (Ideally verify with Supabase Auth or Edge Function)
        if (password === "root") {
            setIsAuthenticated(true);
            sessionStorage.setItem("admin_auth", "true");
            return true;
        }
        return false;
    };

    const logout = () => {
        setIsAuthenticated(false);
        sessionStorage.removeItem("admin_auth");
    };

    const refreshData = async () => {
        const freshData = await adminDataService.getData();
        setData(freshData);
    };

    // Granular Implementations
    const addProject = async (p: Project) => {
        await adminDataService.addProject(p);
        refreshData();
    };

    const updateProject = async (p: Project) => {
        await adminDataService.updateProject(p);
        refreshData();
    };

    const deleteProject = async (id: string) => {
        await adminDataService.deleteProject(id);
        refreshData();
    };

    // Skills are complex because of the nested structure in Mock vs Flattened in DB
    // We will implement them in the service layer to handle the mapping
    const addSkillCategory = async (category: string) => {
        // In DB, we just don't have empty categories easily unless we have a separate 'categories' table
        // For now, we simulate it or just ignore empty categories in DB logic
        // Actually, let's just Refresh logic handled by service
        const newData = { ...data, skills: [...data.skills, { category, items: [] }] };
        setData(newData); // Optimistic
    };

    const addSkillItem = async (category: string, item: string) => {
        await adminDataService.addSkill(category, item);
        refreshData();
    };

    // deleteSkillItem and deleteSkillCategory need to be handled carefuly
    const deleteSkillItem = async (category: string, item: string) => {
        await adminDataService.deleteSkill(category, item);
        refreshData();
    };

    const deleteSkillCategory = async (idx: number) => {
        const category = data.skills[idx].category;
        await adminDataService.deleteSkillCategory(category);
        refreshData();
    };


    const addAchievement = async (a: Achievement) => {
        await adminDataService.addAchievement(a);
        refreshData();
    };

    const deleteAchievement = async (id: string) => {
        await adminDataService.deleteAchievement(id);
        refreshData();
    };

    const addExperience = async (e: any) => {
        await adminDataService.addExperience(e);
        refreshData();
    };

    const deleteExperience = async (id: string) => {
        await adminDataService.deleteExperience(id);
        refreshData();
    };

    const updateProfile = async (p: any) => {
        await adminDataService.updateProfile(p);
        refreshData();
    };

    // Deprecated monolithic save (Mapped to granular calls or just warning)
    const saveData = (newData: AdminData) => {
        console.warn("saveData is deprecated. Use granular actions.");
        // For basic Mock support or fallback, we might still update state
        setData(newData);
    };

    return (
        <AdminContext.Provider value={{
            isAuthenticated, login, logout, data, refreshData, isLoading,
            addProject, updateProject, deleteProject,
            addSkillCategory, addSkillItem, deleteSkillItem, deleteSkillCategory,
            addAchievement, deleteAchievement,
            addExperience, deleteExperience,
            updateProfile,
            saveData
        }}>
            {children}
        </AdminContext.Provider>
    );
}

export const useAdmin = () => {
    const context = useContext(AdminContext);
    if (!context) {
        throw new Error("useAdmin must be used within an AdminProvider");
    }
    return context;
};
