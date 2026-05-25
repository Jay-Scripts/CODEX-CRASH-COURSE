import { BriefcaseBusiness, Download, GitBranch, Mail } from "lucide-react";
import Link from "next/link";
import { profile } from "@/constants/portfolio.constants";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AnimatedSection } from "./animated-section";
import { ContactForm } from "./contact-form";
import { RevealGroup, RevealItem } from "./scroll-reveal";
import { SectionHeading } from "./section-heading";

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
    className="bg-muted/30 px-4 py-20 sm:px-6 lg:px-8"
    id="contact"
  >
    <RevealGroup className="mx-auto max-w-6xl">
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
            <CardContent className="space-y-4 p-6">
              {contactLinks.map((item) => {
                const Icon = item.icon;

                return (
                  <Button
                    asChild
                    className="h-auto w-full justify-between bg-background px-4 py-4 text-sm"
                    key={item.label}
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
                      <span className="flex items-center gap-3">
                        <Icon className="size-4 text-primary" />
                        {item.label}
                      </span>
                      <span className="text-muted-foreground">Open</span>
                    </Link>
                  </Button>
                );
              })}
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
            <CardContent className="p-6">
              <ContactForm />
            </CardContent>
          </Card>
        </RevealItem>
      </RevealGroup>
    </RevealGroup>
  </AnimatedSection>
);
