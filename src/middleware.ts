import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Check for the presence of a specific cookie, e.g., 'auth'
  const token = request.cookies.get('access_token');

  // If no 'auth' cookie is found, redirect to the login page
  if (!token) {
    const loginUrl = new URL('/', request.url);
    return NextResponse.redirect(loginUrl);
  }

  // Allow the request to proceed if the cookie is found
  return NextResponse.next();
}

// Define the paths for which this middleware should run
export const config = {
  matcher: ['/dashboard/:path*',], // Apply middleware to these paths
};
