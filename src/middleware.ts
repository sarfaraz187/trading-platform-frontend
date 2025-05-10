
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

// Add paths that require authentication
const protectedRoutes = ['/', '/profile', '/settings']; // Added /profile and /settings

export function middleware(request: NextRequest) {
  const token = request.cookies.get('firebaseIdToken'); // Assuming you store the ID token in a cookie named 'firebaseIdToken'
  const { pathname } = request.nextUrl;

  const isProtectedRoute = protectedRoutes.some(route => {
    // Exact match for /
    if (route === '/') return pathname === '/';
    // StartsWith for other routes (e.g. /profile, /profile/edit)
    return pathname === route || pathname.startsWith(route + '/');
  });
  
  // If trying to access a protected route without a token, redirect to login
  if (isProtectedRoute && !token) {
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    // You can add a 'redirectedFrom' query parameter if needed
    // url.searchParams.set('redirectedFrom', pathname);
    return NextResponse.redirect(url);
  }

  // Allow the request to proceed if it's not a protected route or if the user is authenticated
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - login page
     * - signup page
     * - public assets (e.g. /images, /terms, /privacy)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|login|signup|images|terms|privacy).*)',
    '/', // Explicitly include the root path if it's protected
  ],
}
