import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { env } from "@/env";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isAdminRoute = pathname.startsWith("/admin-dashboard");
  const isSellerRoute = pathname.startsWith("/seller-dashboard");
  const isCustomerRoute = pathname.startsWith("/dashboard");

  // Only run checks for protected routes
  if (isAdminRoute || isSellerRoute || isCustomerRoute) {
    const cookieHeader = request.headers.get("cookie");

    if (!cookieHeader) {
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }

    try {
      const res = await fetch(`${env.AUTH_URL}/get-session`, {
        headers: {
          Cookie: cookieHeader,
        },
        cache: "no-store",
      });

      if (!res.ok) {
         return NextResponse.redirect(new URL("/sign-in", request.url));
      }

      const session = await res.json();

      if (!session || !session.user) {
        return NextResponse.redirect(new URL("/sign-in", request.url));
      }

      const role = session.user.role;

      if (isAdminRoute && role !== "ADMIN") {
        return NextResponse.redirect(new URL("/sign-in", request.url));
      }
      if (isSellerRoute && role !== "SELLER") {
        return NextResponse.redirect(new URL("/sign-in", request.url));
      }
      if (isCustomerRoute && role !== "CUSTOMER") {
        return NextResponse.redirect(new URL("/sign-in", request.url));
      }

    } catch (error) {
      console.error("Middleware error:", error);
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/admin-dashboard/:path*",
    "/seller-dashboard/:path*",
  ],
};
