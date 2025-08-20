// middleware.ts - Fixed version
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { Roles } from "@/constants/enums/roles";

function isTokenValid(token: string): boolean {
  try {
    const [, payload] = token.split(".");
    const decoded = JSON.parse(atob(payload));
    
    // Check if token is expired
    const currentTime = Math.floor(Date.now() / 1000);
    if (decoded.exp && decoded.exp < currentTime) {
      return false;
    }
    
    return true;
  } catch {
    return false;
  }
}

function getRoleFromToken(token: string): string | null {
  try {
    const [, payload] = token.split(".");
    const { role } = JSON.parse(atob(payload));
    return role;
  } catch {
    return null;
  }
}

export function middleware(req: NextRequest) {
  const accessToken = req.cookies.get("accessToken")?.value;
  const refreshToken = req.cookies.get("refreshToken")?.value;
  const url = req.nextUrl.clone();

  // ✅ If no tokens at all → redirect to signin
  if (!accessToken && !refreshToken) {
    url.pathname = "/signin";
    return NextResponse.redirect(url);
  }

  

  // ✅ If access token exists, validate it
  if (accessToken) {
    // Check if token is valid and not expired
    if (!isTokenValid(accessToken)) {
      url.pathname = "/signin";
      return NextResponse.redirect(url);
    }

    const role = getRoleFromToken(accessToken);
    if (!role) {
      url.pathname = "/signin";
      return NextResponse.redirect(url);
    }

    // ✅ Role-based access control
    if (url.pathname.startsWith("/admin") && role !== Roles.ADMIN) {
      url.pathname = "/unauthorized";
      return NextResponse.redirect(url);
    }

    if (url.pathname.startsWith("/company") && role !== Roles.COMPANY) {
      url.pathname = "/unauthorized";
      return NextResponse.redirect(url);
    }

    if (url.pathname.startsWith("/candidate") && role !== Roles.CANDIDATE) {
      url.pathname = "/unauthorized";
      return NextResponse.redirect(url);
    }

    if (url.pathname.startsWith("/interviewer") && role !== Roles.INTERVIEWER) {
      url.pathname = "/unauthorized";
      return NextResponse.redirect(url);
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