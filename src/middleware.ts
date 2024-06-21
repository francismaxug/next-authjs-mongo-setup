import { NextRequest, NextResponse } from "next/server"
import { authConfig } from "./auth.config"
import NextAuth from "next-auth"

import { PUBLIC_ROUTES, LOGIN, PROTECTED_SUB_ROUTES, ROOT } from "./lib/routes"

const { auth } = NextAuth(authConfig)

export async function middleware(req: NextRequest, res: NextResponse) {
  const url = req.nextUrl

  const session = await auth()
  console.log(session)
  console.log("hii")
  const isAuthenticated = !!session?.user
  console.log(isAuthenticated, url.pathname)

  const isPublicRoute =
    ((PUBLIC_ROUTES.find((route) => url.pathname.startsWith(route)) ||
    url.pathname === ROOT) && !PROTECTED_SUB_ROUTES.find(route => url.pathname.includes(route)))

  if (!isAuthenticated && !isPublicRoute) {
    return NextResponse.redirect(new URL(LOGIN, url))
  }
}

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"]
}
