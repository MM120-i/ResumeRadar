import type { ClassValue } from "clsx";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";

// Formats a file size in bytes to a readable string (KB, MB, GB).
export function formatSize(bytes: number): string {
  if (bytes === 0) {
    return "0 Bytes";
  }

  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}

// Generates a ranom UUID
export const generateUUID = () => crypto.randomUUID();

// cn classname function and all that
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
