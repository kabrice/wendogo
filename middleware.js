// middleware.js (create this file at the root of your project)
import { NextResponse } from 'next/server';

export function middleware(request) {
  const url = request.nextUrl;
  const lowercasePathname = url.pathname.toLowerCase();

  if (url.pathname !== lowercasePathname) {
    url.pathname = lowercasePathname;
    return NextResponse.redirect(url);
  }
}
