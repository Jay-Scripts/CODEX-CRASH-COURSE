import { ArrowRight, Download, Mail, ShieldCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { profile } from "@/constants/portfolio.constants";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

/**
 * Displays the recruiter-facing hero section with primary calls to action.
 */
export const HeroSection = () => (
  <section
    className="relative overflow-hidden border-b border-border bg-background"
    id="top"
  >
    <div className="absolute inset-x-0 top-0 -z-10 h-96 bg-[radial-gradient(circle_at_top,_color-mix(in_oklab,_var(--primary)_22%,_transparent),_transparent_55%)]" />
    <div className="mx-auto grid min-h-[calc(100vh-4rem)] w-full max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
      <div className="max-w-3xl">
        <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-6xl lg:text-7xl">
          {profile.name}
        </h1>
        <p className="mt-4 text-xl font-medium text-primary sm:text-2xl">
          {profile.role}
        </p>
        <p className="mt-6 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
          {profile.summary} Built to show Accenture-style delivery traits:
          quality, clarity, system thinking, and maintainable execution.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button asChild size="lg">
            <Link href="#projects">
              View Projects
              <ArrowRight />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href={profile.resumeUrl}>
              <Download />
              Download Resume
            </Link>
          </Button>
          <Button asChild size="lg" variant="ghost">
            <Link href="#contact">
              <Mail />
              Contact Me
            </Link>
          </Button>
        </div>
      </div>
      <div className="mx-auto w-full max-w-[532px] lg:mx-0 lg:justify-self-end">
        <Image
          alt={`${profile.name} portrait`}
          className="h-auto w-full object-contain"
          height={938}
          priority
          sizes="(min-width: 1024px) 532px, min(100vw - 2rem, 532px)"
          src="/jr-pic-transparent.png"
          unoptimized
          width={1064}
        />
      </div>
    </div>
  </section>
);
