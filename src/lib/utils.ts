import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/** Merge Tailwind class names, resolving conflicts (shadcn convention). */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Format a number as Ukrainian hryvnia, e.g. "199,99 ₴". */
export function formatPrice(value: number): string {
  return `${value.toFixed(2).replace('.', ',')} ₴`;
}
