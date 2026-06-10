import { AboutSection } from "@/components/sections/home/about-section";
import { CertificatesSection } from "@/components/sections/home/certificates-section";
import { ContactSection } from "@/components/sections/home/contact-section";
import { ExperienceSection } from "@/components/sections/home/experience-section";
import { HeroSection } from "@/components/sections/home/hero-section";
import { ProjectsSection } from "@/components/sections/home/projects-section";
import { ServicesSection } from "@/components/sections/home/services-section";
import { SkillsSection } from "@/components/sections/home/skills-section";

/**
 * Composes the recruiter-facing home page from reusable section components.
 */
const Home = () => {
  return (
    <>
      <HeroSection />
      <ServicesSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <ExperienceSection />
      <CertificatesSection />
      <ContactSection />
    </>
  );
};

export default Home;
