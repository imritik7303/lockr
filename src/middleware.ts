import { getSessionCookie } from "better-auth/cookies";
import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = ["/profile" , "/admin/dashboard"];

export async function middleware(req:NextRequest){
    const {nextUrl} = req;
    const sessionCookies = getSessionCookie(req);

    const res = NextResponse.next();

    const isLoggedIn = !!sessionCookies;

    const isOnProtectedRoutes = protectedRoutes.includes(nextUrl.pathname);
    const isOnAuthRoutes = nextUrl.pathname.startsWith("/auth");

    if(isOnProtectedRoutes && !isLoggedIn) {
        return  NextResponse.redirect(new URL("/auth/login" , req.url))
    }

    if(isOnAuthRoutes && isLoggedIn) {
        return NextResponse.redirect(new URL("/profile" , req.url))
    }

    return res;
} 

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};