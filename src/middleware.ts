// middleware.ts - Fixed version
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { Roles } from "@/constants/enums/roles";

function isTokenValid(token: string): boolean {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return false;
    
    const payload = parts[1];
    // Add padding if necessary for atob
    const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
    const decoded = JSON.parse(atob(base64));
    
    // Check if token is expired
    const currentTime = Math.floor(Date.now() / 1000);
    if (decoded.exp && decoded.exp < currentTime) {
      return false;
    }
    
    return true;
  } catch (error) {
    console.error("[Middleware] JWT validation error:", error);
    return false;
  }
}

function getRoleFromToken(token: string): string | null {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;
    
    const payload = parts[1];
    const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
    const { role } = JSON.parse(atob(base64));
    return role;
  } catch {
    return null;
  }
}

export function middleware(req: NextRequest) {
  const accessToken = req.cookies.get("accessToken")?.value;
  const refreshToken = req.cookies.get("refreshToken")?.value;
  const { pathname } = req.nextUrl;

  // Console log for production debugging
  console.log(`[Middleware] Path: ${pathname}, hasAccessToken: ${!!accessToken}, hasRefreshToken: ${!!refreshToken}`);

  // ✅ If no tokens at all → redirect to signin
  if (!accessToken && !refreshToken) {
    return NextResponse.redirect(new URL("/signin", req.url));
  }

  // ✅ If access token exists, validate it
  if (accessToken) {
    if (!isTokenValid(accessToken)) {
      console.warn("[Middleware] Invalid access token, redirecting to signin");
      return NextResponse.redirect(new URL("/signin", req.url));
    }

    const role = getRoleFromToken(accessToken);
    if (!role) {
      return NextResponse.redirect(new URL("/signin", req.url));
    }

    // ✅ Role-based access control
    if (pathname.startsWith("/admin") && role !== Roles.ADMIN) {
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }

    if (pathname.startsWith("/company") && role !== Roles.COMPANY) {
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }

    if (pathname.startsWith("/candidate") && role !== Roles.CANDIDATE) {
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }

    if (pathname.startsWith("/interviewer") && role !== Roles.INTERVIEWER) {
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/company/:path*",
    "/candidate/:path*",
    "/interviewer/:path*",
  ],
};