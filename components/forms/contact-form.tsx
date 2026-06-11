"use client";

import emailjs, { EmailJSResponseStatus } from "@emailjs/browser";
import { Send } from "lucide-react";
import type { ChangeEvent, FormEvent } from "react";
import { useState } from "react";
import { profile } from "@/constants/portfolio.constants";
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

const isConfiguredValue = (value: string) =>
  value.length > 0 && !value.startsWith("your_");

const isEmailJsConfigured = Object.values(emailJsConfig).every(isConfiguredValue);

/**
 * Displays the validated contact form using shared shadcn form controls.
 */
export const ContactForm = () => {
  const [formState, setFormState] = useState<ContactFormState>(initialState);
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [feedback, setFeedback] = useState(
    "The form is connected to EmailJS and ready to send once the env values are set.",
  );
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");

  const updateField =
    (field: keyof ContactFormState) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const sanitizedValue = sanitizeContactField(field, event.target.value);

      setStatus("idle");
      setFeedback(
        "The form is connected to EmailJS and ready to send once the env values are set.",
      );
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
      setFeedback(
        "The form is connected to EmailJS and ready to send once the env values are set.",
      );
      // ==========================================================================
      // Validate Contact Form
      //
      // Reject invalid values before allowing the message to be submitted.
      // ==========================================================================
      const nextErrors = validateContactForm(formState);

      setErrors(nextErrors);

      if (Object.keys(nextErrors).length > 0) {
        setStatus("error");
        setFeedback("Please fix the highlighted fields before sending.");
        return;
      }

      if (!isEmailJsConfigured) {
        setStatus("error");
        setFeedback(
          "EmailJS is not configured yet. Replace the placeholder values in your env file with your real service ID, template ID, and public key.",
        );
        return;
      }

      setStatus("sending");

      await emailjs.send(
        emailJsConfig.serviceId,
        emailJsConfig.templateId,
        {
          from_email: formState.email.trim(),
          from_name: formState.name.trim(),
          message: formState.message.trim(),
        },
        {
          publicKey: emailJsConfig.publicKey,
        },
      );

      setStatus("success");
      setFeedback("Your message was sent. I’ll get back to you soon.");
      setFormState(initialState);
    } catch (error) {
      setStatus("error");
      if (error instanceof EmailJSResponseStatus) {
        setFeedback(
          `EmailJS returned ${error.status}: ${error.text}. Check the dashboard template, service link, and public key.`,
        );
        return;
      }

      setFeedback(
        "Something went wrong while sending. Check your EmailJS template keys and try again.",
      );
    }
  };

  return (
    <form className="space-y-4" noValidate onSubmit={handleSubmit}>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor={fieldIds.name}>Name</Label>
          <Input
            aria-describedby={errors.name ? `${fieldIds.name}-error` : undefined}
            aria-invalid={Boolean(errors.name)}
            autoComplete="name"
            id={fieldIds.name}
            name="name"
            onChange={updateField("name")}
            placeholder="Your name"
            value={formState.name}
          />
          {errors.name ? (
            <p className="text-sm text-destructive" id={`${fieldIds.name}-error`}>
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
            <p className="text-sm text-destructive" id={`${fieldIds.email}-error`}>
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
          <p className="text-sm text-destructive" id={`${fieldIds.message}-error`}>
            {errors.message}
          </p>
        ) : null}
      </div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p aria-live="polite" className="text-sm text-muted-foreground">
          {status === "sending" ? "Sending your message..." : feedback}
        </p>
        <Button disabled={status === "sending"} type="submit">
          <Send />
          {status === "sending" ? "Sending..." : "Send message"}
        </Button>
      </div>
    </form>
  );
};
