"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  ShoppingCart,
  LayoutDashboard,
  Package,
  LogOut,
  Menu,
  X,
  Search,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

import { authClient } from "@/lib/auth-client";
import { Role } from "@/constant/role";


type UserRole = "ADMIN" | "SELLER" | "CUSTOMER";

type HeaderUser = {
  id: string;
  name: string;
  email: string;
  role?: UserRole;
  image?: string | null;
};


export function Header({
  cartCount = 0,
  initialUser = null,
}: {
  cartCount?: number;
  initialUser?: HeaderUser | null;
}) {
  const router = useRouter();

  const [user, setUser] = useState<HeaderUser | null>(initialUser);
  const [loading, setLoading] = useState(!initialUser);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const loadSession = async () => {
      try {
        const res = await authClient.getSession();

        if ("data" in res && res.data?.user) {
          setUser(res.data.user);
        } else {
          setUser(null);
        }
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    if (!initialUser) {
      loadSession();
    }
  }, [initialUser]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    router.push(`/medicines?search=${encodeURIComponent(searchQuery)}`);
    setSearchQuery("");
    setMobileMenuOpen(false);
  };

  const handleSignOut = async () => {
    await authClient.signOut();
    setUser(null);
    router.push("/");
  };
  const dashboardLink =
    user?.role === Role.admin
      ? "/admin-dashboard"
      : user?.role === Role.seller
      ? "/seller-dashboard"
      : "/dashboard";



  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/health-mart.png"
            alt="Health Mart"
            width={36}
            height={36}
            priority
          />
          <span className="hidden text-xl font-bold sm:inline">
            Health Mart
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-6 md:flex">
          {["medicines", "categories", "about"].map((item) => (
            <Link
              key={item}
              href={`/${item}`}
              className="text-sm font-medium text-muted-foreground hover:text-primary"
            >
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </Link>
          ))}
          {user ? (
            <Link
              href={dashboardLink}
              className="text-sm font-medium text-muted-foreground hover:text-primary"
            >
              Dashboard
            </Link>
          ) : null}
        </nav>

        {/* Search */}
        <form
          onSubmit={handleSearch}
          className="hidden flex-1 max-w-md lg:flex"
        >
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search medicines..."
              className="pl-9"
            />
          </div>
        </form>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {/* Cart */}
          <Button variant="ghost" size="icon" asChild className="relative">
            <Link href="/cart">
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <Badge className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 text-xs">
                  {cartCount}
                </Badge>
              )}
            </Link>
          </Button>

          {/* User Menu */}
          {!loading && user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.image ?? ""} />
                    <AvatarFallback>
                      {user.name.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="w-56">
                <div className="px-2 py-1.5">
                  <p className="text-sm font-medium">{user.name}</p>
                  <p className="text-xs text-muted-foreground">{user.email}</p>
                </div>

                <DropdownMenuSeparator />

                <DropdownMenuItem asChild>
                  <Link href={dashboardLink}>
                    <LayoutDashboard className="mr-2 h-4 w-4" />
                    Dashboard
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem
                  onClick={handleSignOut}
                  className="text-destructive cursor-pointer"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : !loading ? (
            <div className="hidden gap-2 sm:flex">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/sign-in">Sign In</Link>
              </Button>
              <Button size="sm" asChild>
                <Link href="/sign-up">Get Started</Link>
              </Button>
            </div>
          ) : null}

          {/* Mobile Toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen((p) => !p)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </div>
    </header>
  );
}
