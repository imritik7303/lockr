import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const VALID_DOMAINS = () => {
  const domain = ["gmail.com" , "yahoo.com" , "outlook.com"]

  if(process.env.NODE_ENV === "development"){
    domain.push("example.com");
  }

  return domain;
}