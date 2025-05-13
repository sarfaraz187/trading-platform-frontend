// middleware.ts
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

// Add paths that require authentication
const protectedRoutes = ["/", "/profile", "/settings"];
// Add paths that are accessible only when NOT authenticated
const authRoutes = ["/login", "/signup", "/forgot-password"];

export function middleware(request: NextRequest) {
  const token = request.cookies.get("authToken");
  const { pathname } = request.nextUrl;

  // Store original destination for redirects
  const url = request.nextUrl.clone();

  // If user is trying to access a protected route without a token
  if (protectedRoutes.some((route) => (route === "/" && pathname === "/") || (route !== "/" && (pathname === route || pathname.startsWith(`${route}/`))))) {
    if (!token) {
      // Redirect to login with original destination as a parameter
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }
  }

  // If user is authenticated and trying to access auth pages (login, register)
  if (token && authRoutes.some((route) => pathname === route || pathname.startsWith(`${route}/`))) {
    // Redirect to home page
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

// Configure which paths middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (images, etc.)
     * - api routes (except auth-related ones we want to protect)
     */
    "/((?!_next/static|_next/image|favicon.ico|public/|api/(?!protected)).*)",
  ],
};
