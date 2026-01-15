import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";


const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mohan Singh | Full Stack & Android Developer",
  description: "Portfolio of Mohan Singh - Android & Full Stack Developer specializing in scalable mobile and web ecosystems.",
  keywords: ["Mohan Singh", "Android Developer", "Full Stack Developer", "React", "Next.js", "Flutter", "Portfolio"],
  openGraph: {
    title: "Mohan Singh | Full Stack & Android Developer",
    description: "Building scalable mobile and web ecosystems.",
    url: "https://mohansingh.dev",
    siteName: "Mohan Singh Portfolio",
    images: [
      {
        url: "/og-image.png", // Ensure you have this image in public folder
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased bg-background text-foreground overflow-x-hidden`}
      >
        <main className="min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}
