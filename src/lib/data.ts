import { Achievement, Experience, Project, Skill } from "./types";

export const personalInfo = {
    name: "Mohan Singh",
    title: "Android & Full Stack Developer",
    tagline: "Transforming ideas into scalable mobile and web ecosystems.",
    email: "contact@mohansingh.dev", // Placeholder
    phone: "+91 77039 18776",
    location: "Faridabad, Haryana",
    socials: {
        linkedin: "https://linkedin.com/in/mohansingh007",
        github: "https://github.com/ms032383",
        email: "mailto:contact@mohansingh.dev",
    },
    stats: {
        leetcode: "1454 (Top 61%)",
        problemsSolved: "300+",
    }
};

export const skills: Skill[] = [
    {
        category: "Mobile",
        items: ["Flutter", "Dart", "Kotlin", "Android SDK", "Firebase"],
    },
    {
        category: "Backend",
        items: ["Flask", "Node.js", "FastAPI", "Django"],
    },
    {
        category: "Database",
        items: ["MongoDB", "PostgreSQL", "MySQL"],
    },
    {
        category: "Tools",
        items: ["Docker", "Git", "Postman", "Figma"],
    },
];

export const experiences: Experience[] = [
    {
        id: "exp-1",
        company: "GramBasket",
        role: "Android Developer Intern",
        startDate: "Oct 2025",
        endDate: "Present",
        points: [
            "Architected modular Flutter + Kotlin hybrid structure.",
            "Building e-commerce ecosystem.",
        ],
    },
    {
        id: "exp-2",
        company: "Droid Automation",
        role: "Android Developer Intern",
        startDate: "Jun 2024",
        endDate: "Aug 2024",
        points: [
            "Designed IoT dashboards.",
            "Developed Flask + MongoDB APIs.",
        ],
    },
];

export const education = [
    {
        id: "edu-1",
        school: "Galgotias University",
        degree: "Bachelor of Technology in Computer Science",
        year: "2021 - 2025",
        grade: "CGPA: 8.5/10",
    },
];

export const projects: Project[] = [
    {
        id: "proj-1",
        title: "GraphPath Visualizer",
        description: "Interactive Algorithm Tool for visualizing Dijkstra & A* algorithms.",
        techStack: ["React.js", "React Flow", "Algorithms"],
        liveLink: "#",
        githubLink: "#",
        image: "/images/graph-path.png", // Placeholder
        category: "Web",
    },
    {
        id: "proj-2",
        title: "E-Commerce Application",
        description: "Full Stack online shopping platform with API-based product data.",
        techStack: ["React", "Node.js", "MongoDB"],
        liveLink: "#",
        githubLink: "#",
        image: "/images/ecommerce.png", // Placeholder
        category: "All", // Represents distinct Full Stack scope
    },
    {
        id: "proj-3",
        title: "CoalSafe",
        description: "Mine Safety System. SIH Top 10 project.",
        techStack: ["Python", "MongoDB", "IoT"],
        liveLink: "#",
        githubLink: "#",
        image: "/images/coalsafe.png", // Placeholder
        category: "Web", // Or Mobile, depending on interface. Assuming Web dashboard.
    },
];

export const achievements: Achievement[] = [
    {
        id: "ach-1",
        title: "Smart India Hackathon 2024",
        description: "Top 10 Finalist",
    },
    {
        id: "ach-2",
        title: "SUSTAIN-A-THON 2024",
        description: "Finalist",
    },
];
