import { NextRequest, NextResponse } from 'next/server';
import {
  publicApiRoutes,
  publicRoutes,
} from './routes';

export default async function middleware(req: NextRequest) {

  const { nextUrl } = req;

  const isPublicApiRoute = publicApiRoutes.includes(nextUrl.pathname as never);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname as never);

  if (isPublicApiRoute) {
    return NextResponse.next();
  }


  if (!isPublicRoute) {
    return NextResponse.redirect(new URL('/products', nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
