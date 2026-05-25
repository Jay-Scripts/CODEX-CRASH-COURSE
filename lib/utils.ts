import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merges conditional Tailwind classes and resolves conflicting utilities.
 */
export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));
