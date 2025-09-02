"use server"

import { auth, ErrorCode } from "@/lib/auth";
import { APIError } from "better-auth/api";

import {headers } from "next/headers";
import { redirect } from "next/navigation";

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
    if (error instanceof APIError) {
          return { error: error.message };
    }
  }

  return { error: "Internal Server Error" };
}