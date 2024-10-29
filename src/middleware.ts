import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname
    const isPublicPath = path==="/auth/login" || path === "/auth/signup" || path === "/verifyEmail" || path === "/"
    const token = request.cookies.get("auth")?.value
    
    if (isPublicPath && token) {
        return NextResponse.redirect(new URL('/profile', request.url))
    }
    if (!isPublicPath && !token) {
        return NextResponse.redirect(new URL('/auth/login', request.url))
    }
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    "/",
    "/auth/login",
    "/auth/signup",
    "/profile",
    "/profile/:id*",
  ],
}