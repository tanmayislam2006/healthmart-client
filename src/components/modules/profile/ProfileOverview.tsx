import Link from "next/link";
import {
  BadgeCheck,
  Building2,
  Mail,
  MapPin,
  ShieldCheck,
  UserCircle2,
} from "lucide-react";

import { Role } from "@/constant/role";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type ProfileUser = {
  id?: string;
  name?: string;
  email?: string;
  image?: string | null;
  role?: string;
};

const roleLabel: Record<string, string> = {
  [Role.admin]: "Administrator",
  [Role.seller]: "Seller",
  [Role.customer]: "Customer",
};

type Props = {
  user: ProfileUser;
};

export function ProfileOverview({ user }: Props) {
  const name = user.name || "Unknown User";
  const email = user.email || "No email found";
  const role = user.role || "UNKNOWN";
  const initials = name.charAt(0).toUpperCase();

  const dashboardLink =
    role === Role.admin
      ? "/admin-dashboard"
      : role === Role.seller
      ? "/seller-dashboard"
      : "/dashboard";

  const actionLink =
    role === Role.admin
      ? "/admin-dashboard/users"
      : role === Role.seller
      ? "/seller-dashboard/medicines"
      : "/dashboard/seller-request";

  const actionLabel =
    role === Role.admin
      ? "Manage Users"
      : role === Role.seller
      ? "Manage Medicines"
      : "Request Seller Access";

  return (
    <div className="mx-auto w-full max-w-6xl space-y-6 p-2 md:p-4">
      <Card className="overflow-hidden border-0 bg-gradient-to-r from-cyan-600 via-sky-600 to-blue-700 text-white shadow-lg">
        <CardContent className="flex flex-col gap-5 p-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16 border border-white/40">
              <AvatarImage src={user.image ?? ""} />
              <AvatarFallback className="bg-white/20 text-xl text-white">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm text-white/80">Profile Overview</p>
              <h1 className="text-2xl font-semibold">{name}</h1>
              <p className="text-sm text-white/90">{email}</p>
            </div>
          </div>
          <Badge className="w-fit bg-white/15 text-white hover:bg-white/20">
            {roleLabel[role] ?? role}
          </Badge>
        </CardContent>
      </Card>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Account Information</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            <div className="rounded-lg border p-4">
              <p className="flex items-center gap-2 text-xs text-muted-foreground">
                <UserCircle2 className="h-4 w-4" />
                Full Name
              </p>
              <p className="mt-1 text-sm font-medium">{name}</p>
            </div>
            <div className="rounded-lg border p-4">
              <p className="flex items-center gap-2 text-xs text-muted-foreground">
                <Mail className="h-4 w-4" />
                Email
              </p>
              <p className="mt-1 text-sm font-medium">{email}</p>
            </div>
            <div className="rounded-lg border p-4">
              <p className="flex items-center gap-2 text-xs text-muted-foreground">
                <Building2 className="h-4 w-4" />
                Role
              </p>
              <p className="mt-1 text-sm font-medium">{roleLabel[role] ?? role}</p>
            </div>
            <div className="rounded-lg border p-4">
              <p className="flex items-center gap-2 text-xs text-muted-foreground">
                <BadgeCheck className="h-4 w-4" />
                User ID
              </p>
              <p className="mt-1 break-all text-xs font-medium">{user.id ?? "N/A"}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button asChild className="w-full justify-start">
              <Link href={dashboardLink}>Go To Dashboard</Link>
            </Button>
            <Button asChild variant="outline" className="w-full justify-start">
              <Link href={actionLink}>{actionLabel}</Link>
            </Button>
            <div className="rounded-lg bg-slate-50 p-3 text-xs text-muted-foreground">
              <p className="flex items-center gap-2 font-medium text-slate-700">
                <ShieldCheck className="h-4 w-4 text-emerald-600" />
                Security Tip
              </p>
              <p className="mt-1">
                Keep your profile and account details updated for smoother order
                and dashboard operations.
              </p>
            </div>
            <div className="rounded-lg border border-dashed p-3 text-xs text-muted-foreground">
              <p className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Add or update your business address from seller request flow when
                needed.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

