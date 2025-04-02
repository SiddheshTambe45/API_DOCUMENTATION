import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const parseStringify = (value: unknown) => {
  if (value === undefined) return null;

  return JSON.parse(JSON.stringify(value));
};

export const helloWorld = () => {
  return "Hello World !!!";
};

export const hello = () => {
  return "Hello World !!!";
};
