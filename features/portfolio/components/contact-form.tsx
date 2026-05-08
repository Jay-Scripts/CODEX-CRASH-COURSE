"use client";

import { Send } from "lucide-react";
import type { ChangeEvent, FormEvent } from "react";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type ContactFormState = {
  email: string;
  message: string;
  name: string;
};

const initialState: ContactFormState = {
  email: "",
  message: "",
  name: "",
};

const isValidEmail = (email: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export const ContactForm = () => {
  const [formState, setFormState] = useState<ContactFormState>(initialState);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const isValid = useMemo(
    () =>
      formState.name.trim().length > 1 &&
      isValidEmail(formState.email) &&
      formState.message.trim().length > 10,
    [formState],
  );

  const updateField =
    (field: keyof ContactFormState) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setStatus("idle");
      setFormState((current) => ({
        ...current,
        [field]: event.target.value,
      }));
    };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isValid) {
      setStatus("error");
      return;
    }

    setStatus("success");
    setFormState(initialState);
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div className="grid gap-4 sm:grid-cols-2">
        <Input
          aria-label="Name"
          autoComplete="name"
          onChange={updateField("name")}
          placeholder="Your name"
          value={formState.name}
        />
        <Input
          aria-label="Email"
          autoComplete="email"
          inputMode="email"
          onChange={updateField("email")}
          placeholder="your.email@example.com"
          type="email"
          value={formState.email}
        />
      </div>
      <Textarea
        aria-label="Message"
        onChange={updateField("message")}
        placeholder="Tell me about the role, team, or project..."
        value={formState.message}
      />
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p aria-live="polite" className="text-sm text-muted-foreground">
          {status === "success"
            ? "Message validated. Connect this form to an email service before deployment."
            : status === "error"
              ? "Please provide a valid name, email, and message."
              : "Form uses client-side validation and is ready for a server action integration."}
        </p>
        <Button disabled={!isValid} type="submit">
          <Send />
          Send message
        </Button>
      </div>
    </form>
  );
};
