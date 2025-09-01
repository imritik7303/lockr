"use server";

import { auth } from "@/lib/auth";

export async function signUpEmailAction(formData: FormData) {
  const name = String(formData.get("name"));
  if (!name) return { error: "please enter your name" };

  const email = String(formData.get("email"));
  if (!email) return { error: "please enter your email" };

  const password = String(formData.get("password"));
  if (!password) return { error: "please enter your password" };

  try {
    await auth.api.signUpEmail({
      body: {
        name,
        email,
        password,
      },
    });
    return { error: null };
  } catch (error) {
    if (error instanceof Error) {
      return { error: "Oops! something went wrong while registring" };
    }
  }

  return { error: "Internal Server Error" };
}
