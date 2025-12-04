import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines and merges Tailwind CSS class names.
 *
 * Uses `clsx` to conditionally join class values and `twMerge` to merge Tailwind CSS classes,
 * ensuring that conflicting classes are resolved according to Tailwind's rules.
 *
 * @param {...ClassValue[]} inputs - The class values to combine and merge. Can be strings, arrays, or objects.
 * @returns {string} The merged class name string.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
