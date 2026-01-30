import { NextRequest, NextResponse } from "next/server";
import { Role } from "@/constant/role";
import { userService } from "@/service/user.service";

export async function proxy(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  const { data } = await userService.getSessionUser();
  const user = data?.user;

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
