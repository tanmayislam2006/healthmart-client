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
  const cookieHeader = req.headers.get("cookie") ?? "";
  const redirect = (path: string) => NextResponse.redirect(new URL(path, req.url));

  const routeRoleMap = [
    { prefix: "/admin-dashboard", role: Role.admin },
    { prefix: "/seller-dashboard", role: Role.seller },
    { prefix: "/dashboard", role: Role.customer },
  ] as const;

  const matchedRoute = routeRoleMap.find((route) => pathname.startsWith(route.prefix));

  let session: SessionResponse | undefined;
  if (AUTH_URL && cookieHeader) {
    try {
      const res = await fetch(`${AUTH_URL}/get-session`, {
        headers: { Cookie: cookieHeader },
        cache: "no-store",
      });

      if (res.ok) {
        session = await res.json();
      }
    } catch {
      session = undefined;
    }
  }

  const user = session?.user;
  const isAuth = Boolean(user);

  if (!isAuth && matchedRoute) {
    return redirect("/sign-in");
  }

  if (matchedRoute && user?.role !== matchedRoute.role) {
    return redirect("/unauthorized");
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
