// /middleware.ts
import { NextResponse } from "next/server"
import { getToken } from "next-auth/jwt"
import type { NextRequest } from "next/server"

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })

  const isAuth = !!token
  const isAuthPage = req.nextUrl.pathname.startsWith("/auth")

  if (isAuthPage && isAuth) {
    return NextResponse.redirect(new URL("/dashboard", req.url))
  }

  if (!isAuth && !isAuthPage) {
    return NextResponse.redirect(new URL("/auth", req.url))
  }

  return NextResponse.next()
}

// Apply middleware to specific routes
export const config = {
  matcher: ["/dashboard/:path*"],
}