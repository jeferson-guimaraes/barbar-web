import { NextRequest, NextResponse } from 'next/server';

const PROTECTED_ROUTES = [
  '/dashboard',
  '/profile'
];

const AUTH_ROUTES = [
  '/login',
  '/register'
];

function isMatchingPath(pathname: string, routePrefix: string): boolean {
  return pathname === routePrefix || pathname.startsWith(`${routePrefix}/`);
}

export function middleware(req: NextRequest) {
  const token = req.cookies.get('@barber.token')?.value;
  const { pathname } = req.nextUrl;

  const isProtected = PROTECTED_ROUTES.some(route => isMatchingPath(pathname, route));
  const isAuthPage = AUTH_ROUTES.some(route => pathname === route);

  if (isProtected && !token) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  if (token && isAuthPage) {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/profile/:path*',
    '/login',
    '/register',
  ],
};