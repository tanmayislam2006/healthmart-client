import { NextRequest, NextResponse } from "next/server";
import { Role } from "@/constant/role";
import { env } from "./env";

const AUTH_URL = env.AUTH_URL;

type SessionResponse = {
  user?: {
    role?: string;
  };
};

export async function proxy(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  let session: SessionResponse | null = null;
  if (AUTH_URL) {
    try {
      const cookieHeader = req.headers.get("cookie") ?? "";
      const res = await fetch(`${AUTH_URL}/get-session`, {
        headers: cookieHeader ? { Cookie: cookieHeader } : {},
        cache: "no-store",
      });

      if (res.ok) {
        session = await res.json();
      }
    } catch {
      session = null;
    }
  }
  const user = session?.user;
  const isAuth = Boolean(user);

  const isAdminRoute = pathname.startsWith("/admin-dashboard");
  const isSellerRoute = pathname.startsWith("/seller-dashboard");
  const isCustomerRoute = pathname.startsWith("/dashboard");

  if (!isAuth && (isAdminRoute || isSellerRoute || isCustomerRoute)) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  if (isAdminRoute && user?.role !== Role.admin) {
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  }

  if (isSellerRoute && user?.role !== Role.seller) {
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  }

  if (isCustomerRoute && user?.role !== Role.customer) {
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin-dashboard/:path*",
    "/seller-dashboard/:path*",
    "/dashboard/:path*",
  ],
};
