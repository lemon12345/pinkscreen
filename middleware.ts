import createIntlMiddleware from 'next-intl/middleware';
import type { NextRequest } from 'next/server';
import { routing } from './i18n/routing';

export default async function middleware(request: NextRequest) {
  const intl = createIntlMiddleware(routing);
  return intl(request);
}

export const config = {
  matcher: [
    '/',
    '/(en|zh|ja)/:path*',
    '/((?!api|_next|_vercel|auth|.*\\.|favicon.ico).*)'
  ]
};