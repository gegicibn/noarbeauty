import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function scoreColor(score: number): string {
  if (score >= 85) return "text-emerald-400";
  if (score >= 70) return "text-accent";
  if (score >= 55) return "text-yellow-400";
  return "text-red-400";
}

export function scoreLabel(score: number): string {
  if (score >= 90) return "Izuzetno";
  if (score >= 80) return "Odlično";
  if (score >= 70) return "Iznad proseka";
  if (score >= 60) return "Prosek";
  return "Ispod proseka";
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("sr-RS", {
    day: "numeric", month: "long", year: "numeric",
  });
}
