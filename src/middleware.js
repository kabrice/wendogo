// middleware.js (in your project root, which I can see is already there)
import { NextResponse } from 'next/server';

export function middleware(request) {
  const { pathname } = request.nextUrl;
  console.log(`Middleware running for: ${request.nextUrl.pathname}`);
  // Skip middleware for these paths that match your project structure
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/static') ||
    pathname.startsWith('/public') ||
    pathname === '/favicon.ico' ||
    pathname.startsWith('/src/assets') // Add this if you serve assets directly
  ) {
    return NextResponse.next();
  }

  // Convert the current path to lowercase
  const lowercasePath = pathname.toLowerCase();
  
  // If the path is already lowercase, continue normally
  if (pathname === lowercasePath) {
    return NextResponse.next();
  }

  // Create new URL with lowercase path
  const url = request.nextUrl.clone();
  url.pathname = lowercasePath;

  // Keep the query parameters
  url.search = request.nextUrl.search;
  
  // 308 status code for permanent redirect
  return NextResponse.redirect(url, 308);
}

// Define which routes this middleware applies to
export const config = {
  matcher: [
    /*
     * Match all paths except:
     * - Files in _next (Next.js internals)
     * - API routes (/api/)
     * - Static files (favicon.ico)
     * - Assets in src/assets/
     */
    '/((?!_next/static|_next/image|favicon.ico|api|src/assets).*)',
  ],
};
