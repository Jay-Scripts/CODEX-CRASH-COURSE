import { BriefcaseBusiness, Download, GitBranch, Mail } from "lucide-react";
import Link from "next/link";
import { profile } from "@/constants/portfolio.constants";
import { SectionAccentBackdrop } from "@/components/common/section-accent-backdrop";
import { AnimatedSection } from "@/components/common/animated-section";
import { RevealGroup, RevealItem } from "@/components/common/scroll-reveal";
import { SectionHeading } from "@/components/common/section-heading";
import { ContactForm } from "@/components/forms/contact-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const contactLinks = [
  {
    label: "LinkedIn",
    href: profile.linkedinUrl,
    icon: BriefcaseBusiness,
  },
  {
    label: "GitHub",
    href: profile.githubUrl,
    icon: GitBranch,
  },
  {
    label: "Email",
    href: `mailto:${profile.email}`,
    icon: Mail,
  },
];

/**
 * Displays profile links, resume access, and the validated contact form.
 */
export const ContactSection = () => (
  <AnimatedSection
    className="bg-muted/30 px-4 py-16 sm:px-6 sm:py-20 lg:px-8"
    id="contact"
  >
    <RevealGroup className="relative mx-auto max-w-6xl">
      <SectionAccentBackdrop variant="right" />
      <RevealItem>
        <SectionHeading
          description="Make it easy for recruiters to verify links, download a resume, and start a conversation."
          eyebrow="Contact"
          title="Ready for junior full-stack interviews"
        />
      </RevealItem>
      <RevealGroup className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
        <RevealItem>
          <Card>
            <CardContent className="space-y-4 p-5 sm:p-6">
              <ul className="space-y-4">
                {contactLinks.map((item) => {
                  const Icon = item.icon;

                  return (
                    <li key={item.label}>
                      <Button
                        asChild
                        className="h-auto w-full justify-between bg-background px-4 py-3.5 text-sm"
                        variant="outline"
                      >
                        <Link
                          href={item.href}
                          rel={
                            item.href.startsWith("http")
                              ? "noopener noreferrer"
                              : undefined
                          }
                          target={item.href.startsWith("http") ? "_blank" : undefined}
                        >
                          <span className="flex min-w-0 items-center gap-3">
                            <Icon className="size-4 text-primary" />
                            <span className="truncate">{item.label}</span>
                          </span>
                          <span className="text-muted-foreground">Open</span>
                        </Link>
                      </Button>
                    </li>
                  );
                })}
              </ul>
              <Button asChild className="w-full" size="lg">
                <Link href={profile.resumeUrl}>
                  <Download />
                  Download Resume
                </Link>
              </Button>
            </CardContent>
          </Card>
        </RevealItem>
        <RevealItem>
          <Card>
            <CardContent className="p-5 sm:p-6">
              <ContactForm />
            </CardContent>
          </Card>
        </RevealItem>
      </RevealGroup>
    </RevealGroup>
  </AnimatedSection>
);
