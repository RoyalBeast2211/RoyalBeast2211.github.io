import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono, Inter } from "next/font/google";
import { ThemeProvider } from "@/context/ThemeContext";
import { CodolioProvider } from "@/context/CodolioContext";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Omkar More — Software Engineer | Systems & Agentic Workflows",
  description:
    "Official portfolio of Omkar More, Software Engineer & B.Tech student at VNIT Nagpur. Incoming Software Engineering Intern at Accenture, Knight on LeetCode (1860, Top 5% Globally, 980+ Solved), and builder of GitLike VCS, RayTracer, and Chatty.",
  keywords: [
    "Omkar More",
    "Software Engineer",
    "VNIT Nagpur",
    "Accenture",
    "Python Concurrency",
    "C++",
    "Systems Programming",
    "Multi-Agent Systems",
    "DeepAgents",
    "Databricks",
    "LangChain",
    "LangGraph",
    "React.js",
    "Next.js",
    "LeetCode Knight",
    "CodeChef",
    "Codolio",
  ],
  authors: [{ name: "Omkar More", url: "https://github.com/RoyalBeast2211" }],
  openGraph: {
    title: "Omkar More — Software Engineer | Systems & Agentic Workflows",
    description:
      "Official portfolio of Omkar More, Software Engineer & B.Tech student at VNIT Nagpur. Knight on LeetCode (980+ solved), Incoming SWE Intern @ Accenture.",
    type: "website",
    locale: "en_US",
    siteName: "Omkar More Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Omkar More — Software Engineer",
    description:
      "Official portfolio of Omkar More, Software Engineer & B.Tech student at VNIT Nagpur.",
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} ${inter.variable} scroll-smooth`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var stored = localStorage.getItem('omkar_theme');
                  var isDark = false;
                  if (stored === 'dark') {
                    isDark = true;
                  } else if (stored === 'light') {
                    isDark = false;
                  } else {
                    isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  }
                  if (isDark) {
                    document.documentElement.classList.add('dark');
                    document.documentElement.setAttribute('data-theme', 'dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                    document.documentElement.setAttribute('data-theme', 'light');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] antialiased selection:bg-[var(--accent)] selection:text-[var(--dark-bg)]">
        <ThemeProvider>
          <CodolioProvider>{children}</CodolioProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
