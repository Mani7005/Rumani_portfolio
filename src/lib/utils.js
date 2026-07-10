import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merge Tailwind classes safely, resolving conflicts (e.g. "p-2 p-4" -> "p-4").
 * Use this in every component that accepts a `className` prop override.
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
