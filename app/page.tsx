import { Suspense } from "react";
import { AboutSection } from "@/features/portfolio/components/about-section";
import { ContactSection } from "@/features/portfolio/components/contact-section";
import { EducationSection } from "@/features/portfolio/components/education-section";
import { ExperienceSection } from "@/features/portfolio/components/experience-section";
import {
  GitHubActivitySection,
  GitHubActivitySkeleton,
} from "@/features/portfolio/components/github-activity-section";
import { HeroSection } from "@/features/portfolio/components/hero-section";
import { ProjectsSection } from "@/features/portfolio/components/projects-section";
import { SkillsSection } from "@/features/portfolio/components/skills-section";

export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <ExperienceSection />
      <EducationSection />
      <Suspense fallback={<GitHubActivitySkeleton />}>
        <GitHubActivitySection />
      </Suspense>
      <ContactSection />
    </>
  );
}
