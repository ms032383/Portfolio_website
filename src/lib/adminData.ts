
import { supabase } from "./supabase";
import { Project, Skill, Achievement } from "./types";
import { projects as mockProjects, skills as mockSkills, achievements as mockAchievements, personalInfo as mockProfile } from "./data";

export interface AdminData {
    projects: Project[];
    skills: { category: string; items: string[] }[];
    achievements: Achievement[];
    profile: any;
}

export const adminDataService = {
    // Fetch all data
    getData: async (): Promise<AdminData> => {
        if (!supabase) return { projects: mockProjects, skills: mockSkills, achievements: mockAchievements, profile: mockProfile };

        const { data: projectsString } = await supabase.from('projects').select('*').order('created_at', { ascending: false });
        const { data: skillsRaw } = await supabase.from('skills').select('*');
        const { data: achievementsRaw } = await supabase.from('achievements').select('*').order('created_at', { ascending: false });
        const { data: profileRaw } = await supabase.from('profile').select('*').limit(1).single();

        // 1. Projects Mapping
        const projects: Project[] = (projectsString || []).map((p: any) => ({
            id: p.id,
            title: p.title,
            description: p.description,
            techStack: p.tech_stack || [],
            liveLink: p.live_link,
            githubLink: p.github_link,
            image: p.image,
            category: "Web" // Default
        }));

        // 2. Skills Mapping (Flattened in DB -> Nested in App)
        // Group by category
        const skillsMap: Record<string, string[]> = {};
        (skillsRaw || []).forEach((s: any) => {
            if (!skillsMap[s.category]) skillsMap[s.category] = [];
            skillsMap[s.category].push(s.name);
        });
        const skills = Object.entries(skillsMap).map(([category, items]) => ({ category, items }));

        // 3. Achievements Mapping
        const achievements: Achievement[] = (achievementsRaw || []).map((a: any) => ({
            id: a.id,
            title: a.title,
            description: a.description
        }));

        // 4. Profile
        const profile = profileRaw || mockProfile;

        // Fallback to mock if DB is empty (Optional, but good for first run)
        if (projects.length === 0 && skills.length === 0) {
            return { projects: mockProjects, skills: mockSkills, achievements: mockAchievements, profile: mockProfile };
        }

        return { projects, skills, achievements, profile };
    },

    // --- Projects ---
    addProject: async (p: Project) => {
        if (!supabase) return;
        await supabase.from('projects').insert({
            title: p.title,
            description: p.description,
            tech_stack: p.techStack,
            live_link: p.liveLink,
            github_link: p.githubLink,
            image: p.image
        });
    },

    updateProject: async (p: Project) => {
        if (!supabase) return;
        await supabase.from('projects').update({
            title: p.title,
            description: p.description,
            tech_stack: p.techStack,
            live_link: p.liveLink,
            github_link: p.githubLink,
            image: p.image
        }).eq('id', p.id);
    },

    deleteProject: async (id: string) => {
        if (!supabase) return;
        await supabase.from('projects').delete().eq('id', id);
    },

    // --- Skills ---
    addSkill: async (category: string, name: string) => {
        if (!supabase) return;
        await supabase.from('skills').insert({ category, name });
    },

    deleteSkill: async (category: string, name: string) => {
        if (!supabase) return;
        await supabase.from('skills').delete().eq('category', category).eq('name', name);
    },

    deleteSkillCategory: async (category: string) => {
        if (!supabase) return;
        await supabase.from('skills').delete().eq('category', category);
    },

    // --- Achievements ---
    addAchievement: async (a: Achievement) => {
        if (!supabase) return;
        await supabase.from('achievements').insert({
            title: a.title,
            description: a.description
        });
    },

    deleteAchievement: async (id: string) => {
        if (!supabase) return;
        await supabase.from('achievements').delete().eq('id', id);
    },

    // --- Profile ---
    updateProfile: async (p: any) => {
        if (!supabase) return;
        // Upsert based on a fixed ID or just assume there's one row
        // Ideally we grab the ID from the loaded profile, but for now we Update the first row if ID exists, or Insert
        if (p.id) {
            await supabase.from('profile').update({
                name: p.name,
                title: p.title,
                tagline: p.tagline,
                email: p.email,
                phone: p.phone,
                location: p.location
            }).eq('id', p.id);
        } else {
            await supabase.from('profile').insert({
                name: p.name,
                title: p.title,
                tagline: p.tagline,
                email: p.email,
                phone: p.phone,
                location: p.location
            });
        }
    }
};
