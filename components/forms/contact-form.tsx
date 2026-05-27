"use client";

import { Send } from "lucide-react";
import type { ChangeEvent, FormEvent } from "react";
import { useState } from "react";
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

/**
 * Displays the validated contact form using shared shadcn form controls.
 */
export const ContactForm = () => {
  const [formState, setFormState] = useState<ContactFormState>(initialState);
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const updateField =
    (field: keyof ContactFormState) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const sanitizedValue = sanitizeContactField(field, event.target.value);

      setStatus("idle");
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

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      // ==========================================================================
      // Validate Contact Form
      //
      // Reject invalid values before allowing the message to be submitted.
      // ==========================================================================
      const nextErrors = validateContactForm(formState);

      setErrors(nextErrors);

      if (Object.keys(nextErrors).length > 0) {
        setStatus("error");
        return;
      }

      setStatus("success");
      setFormState(initialState);
    } catch {
      setStatus("error");
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
          onChange={updateField("message")}
          placeholder="Tell me about the role, team, or project..."
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
          {status === "success"
            ? "Message validated. Connect this form to an email service before deployment."
            : status === "error"
              ? "Please fix the highlighted fields before sending."
              : "Form uses client-side validation and is ready for a server action integration."}
        </p>
        <Button type="submit">
          <Send />
          Send message
        </Button>
      </div>
    </form>
  );
};
