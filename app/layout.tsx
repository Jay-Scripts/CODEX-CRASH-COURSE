import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { profile } from "@/constants/portfolio.constants";
import { ScrollProgress } from "@/components/common/scroll-progress";
import { ScrollToTopButton } from "@/components/common/scroll-to-top-button";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { MotionProvider } from "@/components/providers/motion-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const seoDescription =
  "Full Stack Developer in Manila building responsive web applications with Next.js, React, TypeScript, Supabase, PostgreSQL, QA testing, and technical support.";

const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    jobTitle: profile.role,
    description: seoDescription,
    email: profile.email,
    url: "https://cornelio-portfolio.vercel.app/",
    image: "https://cornelio-portfolio.vercel.app/jr-pic-transparent.png",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Manila",
      addressCountry: "PH",
    },
    sameAs: [profile.githubUrl, profile.linkedinUrl, profile.facebookUrl],
    alumniOf: "Global Reciprocal Colleges",
    knowsAbout: [
      "Next.js",
      "React",
      "TypeScript",
      "Supabase",
      "PostgreSQL",
      "Quality Assurance",
      "Responsive Web Development",
      "Technical Support",
      "UI/UX",
      "PHP",
      "MySQL",
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Cornelio A. Gatbonton Jr Portfolio",
    url: "https://cornelio-portfolio.vercel.app/",
    description: seoDescription,
    publisher: {
      "@type": "Person",
      name: profile.name,
    },
  },
];

export const metadata: Metadata = {
  metadataBase: new URL("https://cornelio-portfolio.vercel.app/"),
  applicationName: "Cornelio A. Gatbonton Jr Portfolio",
  title: {
    default: `${profile.name} | ${profile.role}`,
    template: "%s | Cornelio A. Gatbonton Jr",
  },
  icons: {
    icon: profile.logoSrc,
    shortcut: profile.logoSrc,
  },
  description: seoDescription,
  keywords: [
    "Cornelio A. Gatbonton Jr",
    "Full Stack Developer Manila",
    "Full Stack Developer Philippines",
    "Web Applications",
    "Next.js Developer",
    "React Developer",
    "Next.js Portfolio",
    "React Portfolio",
    "TypeScript Developer",
    "UI/UX Developer",
    "Frontend Developer",
    "Backend Developer",
    "Node.js Developer",
    "PHP Developer",
    "Software Tester",
    "Tech Support",
    "PostgreSQL Developer",
    "QA Tester",
    "Technical Support Engineer",
    "Responsive Web Development",
    "SMART POS",
    "POS System",
    "Inventory System",
  ],
  authors: [{ name: "Cornelio A. Gatbonton Jr" }],
  creator: "Cornelio A. Gatbonton Jr",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: `${profile.name} | ${profile.role}`,
    description: seoDescription,
    type: "website",
    locale: "en_US",
    url: "https://cornelio-portfolio.vercel.app/",
    siteName: "Cornelio A. Gatbonton Jr Portfolio",
    images: [
      {
        url: "/jr-pic-transparent.png",
        alt: `${profile.name} portrait`,
        width: 1064,
        height: 938,
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} | ${profile.role}`,
    description: seoDescription,
    images: ["/jr-pic-transparent.png"],
  },
};

/**
 * Wraps the application with global fonts, metadata, theme state, and layout.
 */
const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html
      className={`${geistSans.variable} ${geistMono.variable} h-full scroll-smooth`}
      lang="en"
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col overflow-x-clip bg-background font-sans text-foreground antialiased">
        <script
          type="application/ld+json"
        >
          {JSON.stringify(structuredData)}
        </script>
        <MotionProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem={false}
          >
            <ScrollProgress />
            <ScrollToTopButton />
            <SiteHeader />
            <main className="flex-1">{children}</main>
            <SiteFooter />
          </ThemeProvider>
        </MotionProvider>
      </body>
    </html>
  );
};

export default RootLayout;
