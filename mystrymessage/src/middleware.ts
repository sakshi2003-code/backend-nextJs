import { NextRequest,NextResponse } from 'next/server'
// import type { NextRequest } from 'next/server'
// agar hme puri file m authentication chaiye
 export { default } from "next-auth/middleware"

import { getToken } from 'next-auth/jwt'

// See "Matching Paths" below to learn more
export const config = {
    matcher: [
      '/sign-in',
      '/sign-up',
      '/',
      '/dashboard/:path*',
      '/verify/:path'
    ],
  }





// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
// token
const token=await getToken({req:request})
const url=request.nextUrl
// redirection  strategy
if(token && (
    url.pathname.startsWith('/sign-in')||
    url.pathname.startsWith('/sign-up')||
    url.pathname.startsWith('/verify')||
    url.pathname==='/'
)){
    return NextResponse.redirect(new URL('/dashboard', request.url))
}



if (!token && url.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }

  return NextResponse.next();
}
 
