import { Suspense } from "react";
import { AboutSection } from "@/components/sections/home/about-section";
import { ContactSection } from "@/components/sections/home/contact-section";
import { EducationSection } from "@/components/sections/home/education-section";
import { ExperienceSection } from "@/components/sections/home/experience-section";
import {
  GitHubActivitySection,
  GitHubActivitySkeleton,
} from "@/components/sections/home/github-activity-section";
import { HeroSection } from "@/components/sections/home/hero-section";
import { ProjectsSection } from "@/components/sections/home/projects-section";
import { SkillsSection } from "@/components/sections/home/skills-section";

/**
 * Composes the recruiter-facing home page from reusable section components.
 */
const Home = () => {
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
};

export default Home;
