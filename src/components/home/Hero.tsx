import Link from "next/link";
import Image from "next/image";
import {
  ShieldCheck,
  Truck,
  Clock,
  BadgeCheck,
  Pill,
  Star,
  Users,
  Package,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-emerald-50 via-background to-cyan-50">
      {/* Background Glow */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-[-10rem] h-[30rem] w-[30rem] -translate-x-1/2 rounded-full bg-emerald-300/30 blur-3xl" />
        <div className="absolute right-[-8rem] bottom-[-8rem] h-[28rem] w-[28rem] rounded-full bg-cyan-300/30 blur-3xl" />
      </div>

      <div className="container mx-auto grid min-h-[85vh] grid-cols-1 items-center gap-16 px-4 py-20 lg:grid-cols-2">
        {/* LEFT */}
        <div className="space-y-10">
          <span className="inline-flex items-center gap-2 rounded-full border bg-background/80 px-4 py-1 text-sm font-medium shadow-sm">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            Trusted by 50,000+ customers
          </span>

          <h1 className="text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">
            Healthcare that
            <span className="block bg-gradient-to-r from-emerald-500 to-cyan-500 bg-clip-text text-transparent">
              arrives safely
            </span>
            at your doorstep
          </h1>

          <p className="max-w-xl text-lg text-muted-foreground">
            Buy verified medicines from licensed sellers. Transparent pricing,
            fast delivery, and professional care.
          </p>

          <div className="flex flex-wrap gap-4">
            <Button size="lg" asChild>
              <Link href="/medicines">Shop Medicines</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/categories">Browse Categories</Link>
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-6 sm:grid-cols-4">
            <Feature icon={ShieldCheck} label="100% Genuine" />
            <Feature icon={Truck} label="Fast Delivery" />
            <Feature icon={Clock} label="Same Day Dispatch" />
            <Feature icon={BadgeCheck} label="Licensed Sellers" />
          </div>
        </div>

        {/* RIGHT – NEW DESIGN */}
        <div className="relative flex justify-center lg:justify-end">
          {/* Main Product Card */}
          <Card className="relative z-10 w-full max-w-sm rounded-2xl shadow-xl">
            <CardContent className="space-y-5 p-6">
              <div className="flex items-center justify-between">
                <Badge variant="secondary">Best Seller</Badge>
                <div className="flex items-center gap-1 text-sm">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  4.9
                </div>
              </div>

              <div className="flex items-center justify-center rounded-xl bg-muted/40 p-6">
                <Pill className="h-20 w-20 text-emerald-600" />
              </div>

              <div>
                <h3 className="text-lg font-semibold">
                  Vitamin D3 1000 IU
                </h3>
                <p className="text-sm text-muted-foreground">
                  Supports immunity & bone health
                </p>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xl font-bold text-emerald-600">
                  $12.99
                </span>
                <Button size="sm">Add to Cart</Button>
              </div>
            </CardContent>
          </Card>

          {/* Floating Stats */}
          <FloatingStat
            icon={Users}
            label="Active Buyers"
            value="12k+"
            className="left-4 top-10"
          />

          <FloatingStat
            icon={Package}
            label="Medicines"
            value="3,500+"
            className="right-[-4rem] -bottom-6 z-20"
          />
        </div>
      </div>
    </section>
  );
}

/* ---------- Small Components ---------- */

function Feature({
  icon: Icon,
  label,
}: {
  icon: any;
  label: string;
}) {
  return (
    <div className="flex items-center gap-3 text-sm">
      <div className="rounded-lg bg-emerald-100 p-2 text-emerald-600">
        <Icon className="h-4 w-4" />
      </div>
      <span className="font-medium">{label}</span>
    </div>
  );
}

function FloatingStat({
  icon: Icon,
  label,
  value,
  className,
}: {
  icon: any;
  label: string;
  value: string;
  className: string;
}) {
  return (
    <div
      className={`absolute hidden items-center gap-3 rounded-xl border bg-background/90 px-4 py-3 shadow-lg backdrop-blur lg:flex ${className}`}
    >
      <div className="rounded-lg bg-emerald-100 p-2 text-emerald-600">
        <Icon className="h-4 w-4" />
      </div>
      <div>
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="text-sm font-bold">{value}</p>
      </div>
    </div>
  );
}
