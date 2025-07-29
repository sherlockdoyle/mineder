import { NextRequest, NextResponse } from 'next/server';
import { USER_TOKEN } from './data/user';

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('auth-token')?.value;
  const isDefaultUser = token && token === USER_TOKEN;
  const { pathname } = request.nextUrl;

  if (pathname.startsWith('/swipe') || pathname.startsWith('/api/image')) {
    if (!isDefaultUser) return NextResponse.redirect(new URL('/', request.url));
  }

  if (pathname === '/') {
    if (isDefaultUser) return NextResponse.redirect(new URL('/swipe', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/swipe/:path*', '/api/image/:name*'],
};
