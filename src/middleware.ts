import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { jwtVerify } from 'jose';

const intlMiddleware = createMiddleware(routing);

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Proteksi rute /admin
  if (pathname.startsWith('/admin')) {
    // Abaikan login dari pengecekan token
    if (!pathname.startsWith('/admin/login')) {
      const token = request.cookies.get('admin_token')?.value;

      if (!token) {
        return NextResponse.redirect(new URL('/admin/login', request.url));
      }

      try {
        const secret = new TextEncoder().encode(process.env.JWT_SECRET);
        await jwtVerify(token, secret);
      } catch (error) {
        // Token tidak valid atau expired
        return NextResponse.redirect(new URL('/admin/login', request.url));
      }
    }
    
    // Sangat penting: Lewati middleware next-intl agar admin tidak mendapatkan prefix bahasa (404)
    return NextResponse.next();
  }

  // Lanjutkan ke middleware next-intl untuk rute lainnya
  return intlMiddleware(request);
}

export const config = {
  matcher: [
    '/',
    '/(id|en)/:path*',
    '/((?!_next|_vercel|.*\\..*).*)'
  ]
};
