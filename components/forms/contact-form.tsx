"use client";

import emailjs, { EmailJSResponseStatus } from "@emailjs/browser";
import { CheckCircle2, Send, X } from "lucide-react";
import type { ChangeEvent, FormEvent } from "react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type {
  ContactFormErrors,
  ContactFormState,
} from "@/validators/contact.validator";
import {
  sanitizeContactField,
  validateContactField,
  validateContactForm,
} from "@/validators/contact.validator";

const initialState: ContactFormState = {
  email: "",
  message: "",
  name: "",
};

const fieldIds = {
  email: "contact-email",
  message: "contact-message",
  name: "contact-name",
} as const;

const emailJsConfig = {
  publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ?? "",
  serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ?? "",
  templateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ?? "",
} as const;

const MAX_MESSAGES_PER_WINDOW = 3;
const RATE_LIMIT_WINDOW_MS = 24 * 60 * 60 * 1000;
const RATE_LIMIT_THROTTLE_MS = 30 * 1000;
const RATE_LIMIT_STORAGE_KEY = "contact-form-emailjs-rate-limit";

const isConfiguredValue = (value: string) =>
  value.length > 0 && !value.startsWith("your_");

const isEmailJsConfigured = Object.values(emailJsConfig).every(isConfiguredValue);

type ContactRateLimitState = {
  count: number;
  lastAttemptAt: number;
  windowStart: number;
};

const getFreshRateLimitState = (): ContactRateLimitState => ({
  count: 0,
  lastAttemptAt: 0,
  windowStart: Date.now(),
});

const readRateLimitState = () => {
  if (typeof window === "undefined") {
    return null;
  }

  const rawState = window.localStorage.getItem(RATE_LIMIT_STORAGE_KEY);

  if (!rawState) {
    return getFreshRateLimitState();
  }

  try {
    const parsedState = JSON.parse(rawState) as ContactRateLimitState;

    if (
      typeof parsedState.count !== "number" ||
      typeof parsedState.lastAttemptAt !== "number" ||
      typeof parsedState.windowStart !== "number"
    ) {
      throw new Error("Invalid rate limit state");
    }

    if (Date.now() - parsedState.windowStart >= RATE_LIMIT_WINDOW_MS) {
      window.localStorage.removeItem(RATE_LIMIT_STORAGE_KEY);
      return getFreshRateLimitState();
    }

    return parsedState;
  } catch {
    window.localStorage.removeItem(RATE_LIMIT_STORAGE_KEY);
    return getFreshRateLimitState();
  }
};

const writeRateLimitState = (state: ContactRateLimitState) => {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(RATE_LIMIT_STORAGE_KEY, JSON.stringify(state));
};

/**
 * Displays the validated contact form using shared shadcn form controls.
 */
export const ContactForm = () => {
  const [formState, setFormState] = useState<ContactFormState>(initialState);
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [messagesRemaining, setMessagesRemaining] = useState(
    MAX_MESSAGES_PER_WINDOW,
  );
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");

  useEffect(() => {
    const rateLimitState = readRateLimitState() ?? getFreshRateLimitState();
    const frameId = window.requestAnimationFrame(() => {
      setMessagesRemaining(
        Math.max(0, MAX_MESSAGES_PER_WINDOW - rateLimitState.count),
      );
    });

    return () => window.cancelAnimationFrame(frameId);
  }, []);

  const updateField =
    (field: keyof ContactFormState) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const sanitizedValue = sanitizeContactField(field, event.target.value);

      setStatus("idle");
      setIsSuccessModalOpen(false);
      setFormState((current) => ({ ...current, [field]: sanitizedValue }));
      setErrors((current) => {
        const nextErrors = { ...current };
        const fieldError = validateContactField(field, sanitizedValue);

        if (fieldError) {
          nextErrors[field] = fieldError;
        } else {
          delete nextErrors[field];
        }

        return nextErrors;
      });
    };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      setIsSuccessModalOpen(false);

      const nextErrors = validateContactForm(formState);

      setErrors(nextErrors);

      if (Object.keys(nextErrors).length > 0) {
        setStatus("error");
        return;
      }

      if (!isEmailJsConfigured) {
        setStatus("error");
        return;
      }

      const rateLimitState = readRateLimitState() ?? getFreshRateLimitState();

      if (rateLimitState.count >= MAX_MESSAGES_PER_WINDOW) {
        setStatus("error");
        return;
      }

      if (
        rateLimitState.lastAttemptAt > 0 &&
        Date.now() - rateLimitState.lastAttemptAt < RATE_LIMIT_THROTTLE_MS
      ) {
        setStatus("error");
        return;
      }

      setStatus("sending");

      await emailjs.send(
        emailJsConfig.serviceId,
        emailJsConfig.templateId,
        {
          from_email: formState.email.trim(),
          from_name: formState.name.trim(),
          reply_to: formState.email.trim(),
          message: formState.message.trim(),
        },
        {
          publicKey: emailJsConfig.publicKey,
        },
      );

      const updatedState: ContactRateLimitState = {
        count: rateLimitState.count + 1,
        lastAttemptAt: Date.now(),
        windowStart: rateLimitState.windowStart,
      };

      writeRateLimitState(updatedState);
      setMessagesRemaining(
        Math.max(0, MAX_MESSAGES_PER_WINDOW - updatedState.count),
      );
      setStatus("success");
      setIsSuccessModalOpen(true);
      setFormState(initialState);
    } catch (error) {
      const rateLimitState = readRateLimitState() ?? getFreshRateLimitState();

      writeRateLimitState({
        ...rateLimitState,
        lastAttemptAt: Date.now(),
      });
      setStatus("error");

      if (error instanceof EmailJSResponseStatus) {
        return;
      }
    }
  };

  return (
    <>
      <form className="space-y-4" noValidate onSubmit={handleSubmit}>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor={fieldIds.name}>Name</Label>
            <Input
              aria-describedby={
                errors.name ? `${fieldIds.name}-error` : undefined
              }
              aria-invalid={Boolean(errors.name)}
              autoComplete="name"
              id={fieldIds.name}
              name="name"
              onChange={updateField("name")}
              placeholder="Your name"
              value={formState.name}
            />
            {errors.name ? (
              <p
                className="text-sm text-destructive"
                id={`${fieldIds.name}-error`}
              >
                {errors.name}
              </p>
            ) : null}
          </div>
          <div className="space-y-2">
            <Label htmlFor={fieldIds.email}>Email</Label>
            <Input
              aria-describedby={
                errors.email ? `${fieldIds.email}-error` : undefined
              }
              aria-invalid={Boolean(errors.email)}
              autoComplete="email"
              id={fieldIds.email}
              inputMode="email"
              name="email"
              onChange={updateField("email")}
              placeholder="your.email@example.com"
              type="email"
              value={formState.email}
            />
            {errors.email ? (
              <p
                className="text-sm text-destructive"
                id={`${fieldIds.email}-error`}
              >
                {errors.email}
              </p>
            ) : null}
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor={fieldIds.message}>Message</Label>
          <Textarea
            aria-describedby={
              errors.message ? `${fieldIds.message}-error` : undefined
            }
            aria-invalid={Boolean(errors.message)}
            id={fieldIds.message}
            name="message"
            onChange={updateField("message")}
            placeholder="Tell me about the role, team, or project..."
            required
            rows={5}
            value={formState.message}
          />
          {errors.message ? (
            <p
              className="text-sm text-destructive"
              id={`${fieldIds.message}-error`}
            >
              {errors.message}
            </p>
          ) : null}
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Button
            disabled={status === "sending" || messagesRemaining <= 0}
            type="submit"
          >
            <Send />
            {status === "sending"
              ? "Sending..."
              : messagesRemaining <= 0
                ? "Limit reached"
                : "Send message"}
          </Button>
        </div>
        <p className="text-xs text-muted-foreground">
          {messagesRemaining > 0
            ? `${messagesRemaining} message${messagesRemaining === 1 ? "" : "s"} left in this 24-hour window.`
            : "Send limit reached for this 24-hour window."}
        </p>
      </form>
      {isSuccessModalOpen ? (
        <div
          aria-modal="true"
          className="fixed inset-0 z-[90] flex items-center justify-center bg-background/80 px-4 backdrop-blur-sm"
          role="dialog"
        >
          <div className="relative w-full max-w-sm rounded-2xl border border-border/70 bg-background p-6 shadow-2xl">
            <button
              aria-label="Close success message"
              className="absolute right-3 top-3 rounded-full p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              onClick={() => setIsSuccessModalOpen(false)}
              type="button"
            >
              <X className="size-4" />
            </button>
            <div className="flex flex-col items-center text-center">
              <span className="grid size-12 place-items-center rounded-full bg-primary/10 text-primary">
                <CheckCircle2 className="size-6" />
              </span>
              <h3 className="mt-4 text-lg font-semibold text-foreground">
                Message sent
              </h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Your message was sent successfully. I&apos;ll get back to you soon.
              </p>
              <Button
                className="mt-5"
                onClick={() => setIsSuccessModalOpen(false)}
                type="button"
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};
