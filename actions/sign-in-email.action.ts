"use server"

import { auth } from "@/lib/auth";
import { parseSetCookieHeader } from "better-auth/cookies";
import { cookies } from "next/headers";

export async function signInEmailAction(formData: FormData) {
 
  const email = String(formData.get("email"));
  if (!email) return { error: "please enter your email" };

  const password = String(formData.get("password"));
  if (!password) return { error: "please enter your password" };

  try {
    const res = await auth.api.signInEmail({
      body: {
        email,
        password,
      },
      asResponse:true
    });

    const setCookieHeader = res.headers.get("set-cookie");
    if(setCookieHeader){
        const cookie = parseSetCookieHeader(setCookieHeader);
        const cookieStore = await cookies();
        const [key , cookieAttributes] = [...cookie.entries()][0];

        const value = cookieAttributes.value;
        const maxAge = cookieAttributes["max-age"];
        const path = cookieAttributes.path
        const httpOnly = cookieAttributes.httponly
        const sameSite = cookieAttributes.samesite;

        cookieStore.set(key ,decodeURIComponent(value),{
            maxAge,
            path,
            httpOnly,
            sameSite
        });
    }
    return { error: null };
  } catch (error) {
    if (error instanceof Error) {
      return { error: "Oops! something went wrong while logging in" };
    }
  }

  return { error: "Internal Server Error" };
}