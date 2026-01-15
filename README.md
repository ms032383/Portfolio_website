# Portfolio Website

A modern, highly interactive portfolio website built with **Next.js 16**, designed to mimic a desktop operating system environment. This project features a robust Admin Panel for content management, a persistent music player, and a sleek, dynamic UI powered by Tailwind CSS 4 and Framer Motion.

## 🚀 Features

*   **OS-like Desktop Interface:** A clean, immersive user interface resembling a desktop operating system with a customizable wallpaper.
*   **Dynamic Music Player:** A persistent, Spotify-style music player that loads audio tracks from the `public/audio` directory.
*   **Admin Dashboard:** A secured area to manage:
    *   Projects
    *   Skills
    *   Achievements
    *   Profile Information
*   **Supabase Backend:** Real-time database for persistent CRUD operations.
*   **Responsive Design:** Fully responsive layout optimized for all devices.
*   **Smooth Animations:** Powered by Framer Motion for fluid transitions and interactions.

## 🛠️ Tech Stack

*   **Framework:** [Next.js 16](https://nextjs.org/) (App Router)
*   **Language:** TypeScript
*   **Styling:** [Tailwind CSS 4](https://tailwindcss.com/)
*   **Animations:** [Framer Motion](https://www.framer.com/motion/)
*   **Icons:** [Lucide React](https://lucide.dev/)
*   **Backend & Auth:** [Supabase](https://supabase.com/)

## 📦 Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/ms032383/Portfolio_website.git
    cd Portfolio_website
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up Environment Variables:**
    Create a `.env.local` file in the root directory and add your Supabase credentials:
    ```env
    NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
    NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
    ```

4.  **Run the development server:**
    ```bash
    npm run dev
    ```

    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🚀 Deployment

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new).

1.  Push your code to a GitHub repository.
2.  Import the project into Vercel.
3.  Add your Environment Variables in the Vercel Project Settings.
4.  Deploy!

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.
