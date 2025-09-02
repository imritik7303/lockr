import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getValidDomain()  {
  const domain = ["gmail.com" , "yahoo.com" , "outlook.com"]

  if(process.env.NODE_ENV === "development"){
    domain.push("example.com");
  }

  return domain;
}

export function normalizeName(name :string) {
  return name
  .trim()
    .replace(/\s+/g, " ")
    .replace(/[^a-zA-Z\s'-]/g, "")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}