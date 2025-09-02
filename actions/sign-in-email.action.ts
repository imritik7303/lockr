"use server"

import { auth } from "@/lib/auth";

import {headers } from "next/headers";

export async function signInEmailAction(formData: FormData) {
 
  const email = String(formData.get("email"));
  if (!email) return { error: "please enter your email" };

  const password = String(formData.get("password"));
  if (!password) return { error: "please enter your password" };

  try {
    const res = await auth.api.signInEmail({
        headers : await headers(),
      body: {
        email,
        password,
      },
    });


    return { error: null };
  } catch (error) {
    if (error instanceof Error) {
      return { error: "Oops! something went wrong while logging in" };
    }
  }

  return { error: "Internal Server Error" };
}