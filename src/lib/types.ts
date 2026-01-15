export interface Project {
    id: string;
    title: string;
    description: string;
    techStack: string[];
    liveLink?: string;
    githubLink?: string;
    image: string; // URL or path
    category: "Mobile" | "Web" | "All";
}

export interface Experience {
    id: string;
    company: string;
    role: string;
    startDate: string;
    endDate: string;
    points: string[];
}

export interface Skill {
    category: "Mobile" | "Backend" | "Database" | "Tools";
    items: string[];
}

export interface Achievement {
    id: string;
    title: string;
    description: string;
}

export interface Message {
    id?: string;
    name: string;
    email: string;
    message: string;
    created_at?: string;
}
