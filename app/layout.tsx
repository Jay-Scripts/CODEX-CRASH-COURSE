import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { ScrollProgress } from "@/features/portfolio/components/scroll-progress";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://portfolio.example.com"),
  title: {
    default: "Cornelio Jay Scripts | Junior Full-Stack Developer",
    template: "%s | Cornelio Jay Scripts",
  },
  description:
    "Recruiter-friendly junior full-stack developer portfolio focused on Next.js, React, TypeScript, QA testing, database design, and enterprise-ready delivery.",
  keywords: [
    "Junior Full-Stack Developer",
    "Next.js Developer",
    "React Developer",
    "TypeScript",
    "QA Testing",
    "Supabase",
    "PostgreSQL",
    "Accenture",
  ],
  authors: [{ name: "Cornelio Jay Scripts" }],
  creator: "Cornelio Jay Scripts",
  openGraph: {
    title: "Cornelio Jay Scripts | Junior Full-Stack Developer",
    description:
      "Modern enterprise portfolio for junior full-stack developer roles.",
    type: "website",
    locale: "en_US",
    url: "https://portfolio.example.com",
    siteName: "Cornelio Jay Scripts Portfolio",
  },
  robots: {
    index: true,
    follow: true,
  },
  twitter: {
    card: "summary_large_image",
    title: "Cornelio Jay Scripts | Junior Full-Stack Developer",
    description:
      "Modern enterprise portfolio for junior full-stack developer roles.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      className={`${geistSans.variable} ${geistMono.variable} h-full scroll-smooth`}
      lang="en"
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col bg-background font-sans text-foreground antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          disableTransitionOnChange
          enableSystem
        >
          <ScrollProgress />
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </ThemeProvider>
      </body>
    </html>
  );
}
