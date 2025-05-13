import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const token = req.cookies.get('@barber.token')?.value;

  const { pathname } = req.nextUrl;
  const isAuthPage = pathname === '/login';
	const isRegisterPage = pathname === '/register';
  const isProtectedPage = pathname.startsWith('/dashboard');

  if (isProtectedPage && !token) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  if (token && (isAuthPage || isRegisterPage)) {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/login', '/register'],
};