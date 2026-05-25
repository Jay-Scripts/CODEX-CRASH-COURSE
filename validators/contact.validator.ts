export type ContactFormState = {
  email: string;
  message: string;
  name: string;
};

export type ContactFormErrors = Partial<
  Record<keyof ContactFormState, string>
>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const sanitizeName = (value: string) =>
  value
    .replace(/[^a-zA-Z\s.'-]/g, "")
    .replace(/\s{2,}/g, " ")
    .slice(0, 80);

const sanitizeEmail = (value: string) =>
  value.replace(/[^a-zA-Z0-9@._+-]/g, "").toLowerCase().slice(0, 120);

const sanitizeMessage = (value: string) =>
  value
    .replace(/[^a-zA-Z0-9\s.,!?'"():;@/&-]/g, "")
    .replace(/\s{3,}/g, "  ")
    .slice(0, 1000);

/**
 * Sanitizes a contact form field with an allowlist before storing it in state.
 */
export const sanitizeContactField = (
  field: keyof ContactFormState,
  value: string,
) => {
  switch (field) {
    case "name":
      return sanitizeName(value);
    case "email":
      return sanitizeEmail(value);
    case "message":
      return sanitizeMessage(value);
    default:
      return value;
  }
};

/**
 * Validates one contact form field and returns a user-friendly error message.
 */
export const validateContactField = (
  field: keyof ContactFormState,
  value: string,
) => {
  const trimmedValue = value.trim();

  switch (field) {
    case "name":
      return trimmedValue.length >= 2
        ? undefined
        : "Please enter at least 2 characters for your name.";
    case "email":
      return EMAIL_PATTERN.test(trimmedValue)
        ? undefined
        : "Please enter a valid email address.";
    case "message":
      return trimmedValue.length >= 10
        ? undefined
        : "Please enter at least 10 characters for your message.";
    default:
      return undefined;
  }
};

/**
 * Validates the full contact form payload before submission.
 */
export const validateContactForm = (values: ContactFormState) => {
  const errors: ContactFormErrors = {};

  for (const field of Object.keys(values) as (keyof ContactFormState)[]) {
    const message = validateContactField(field, values[field]);

    if (message) {
      errors[field] = message;
    }
  }

  return errors;
};
