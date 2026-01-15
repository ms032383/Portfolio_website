
import { supabase } from "./supabase";
import { Project, Skill, Achievement, Experience } from "./types";
import { projects as mockProjects, skills as mockSkills, achievements as mockAchievements, personalInfo as mockProfile, experiences as mockExperiences } from "./data";

export interface AdminData {
    projects: Project[];
    skills: { category: string; items: string[] }[];
    achievements: Achievement[];
    experiences: Experience[];
    profile: any;
}

export const adminDataService = {
    // Fetch all data
    getData: async (): Promise<AdminData> => {
        if (!supabase) return { projects: mockProjects, skills: mockSkills, achievements: mockAchievements, profile: mockProfile, experiences: mockExperiences };

        const { data: projectsString } = await supabase.from('projects').select('*').order('created_at', { ascending: false });
        const { data: skillsRaw } = await supabase.from('skills').select('*');
        const { data: achievementsRaw } = await supabase.from('achievements').select('*').order('created_at', { ascending: false });
        const { data: experiencesRaw } = await supabase.from('experiences').select('*').order('created_at', { ascending: false }); // Added
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

        // 4. Experiences Mapping (New)
        const experiences: Experience[] = (experiencesRaw || []).map((e: any) => ({
            id: e.id,
            company: e.company,
            role: e.role,
            startDate: e.start_date,
            endDate: e.end_date,
            points: e.points || []
        }));

        // 5. Profile
        const profile = profileRaw || mockProfile;

        // Fallback to mock if DB is empty
        if (projects.length === 0 && skills.length === 0 && experiences.length === 0) {
            return { projects: mockProjects, skills: mockSkills, achievements: mockAchievements, profile: mockProfile, experiences: [] };
        }

        return { projects, skills, achievements, profile, experiences };
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
    },

    // --- Create Experience ---
    addExperience: async (e: Experience) => {
        if (!supabase) return;
        await supabase.from('experiences').insert({
            company: e.company,
            role: e.role,
            start_date: e.startDate,
            end_date: e.endDate,
            points: e.points
        });
    },

    deleteExperience: async (id: string) => {
        if (!supabase) return;
        await supabase.from('experiences').delete().eq('id', id);
    },

    // --- Messages ---
    sendMessage: async (name: string, email: string, message: string) => {
        if (!supabase) return;
        await supabase.from('messages').insert({ name, email, message });
    }
};
