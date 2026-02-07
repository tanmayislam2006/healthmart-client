import Link from "next/link";
import {
  ArrowRight,
  Baby,
  Bone,
  Brain,
  Eye,
  HeartPulse,
  Leaf,
  Pill,
  Sparkles,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { userService } from "@/service/user.service";
import type { Category } from "@/types";

export const dynamic = "force-dynamic";

const iconMap: Record<string, any> = {
  "Pain Relief": Pill,
  "Heart Health": HeartPulse,
  "Brain & Memory": Brain,
  "Bone & Joint": Bone,
  "Eye Care": Eye,
  "Baby Care": Baby,
  "Natural": Leaf,
  "Vitamins": Sparkles,
};

const normalizeCategories = (input: Category[]) =>
  input.filter((category) => category.status !== "DISABLED");

export default async function CategoriesPage() {
  const response = await userService.getCategories();
  const categories = normalizeCategories(response?.data ?? []);

  return (
    <div className="relative">
      <div className="absolute inset-x-0 top-0 h-72 bg-gradient-to-b from-emerald-100/70 via-white to-transparent" />
      <div className="relative container mx-auto space-y-10 px-6 py-12">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-3">
            <Badge className="w-fit bg-emerald-100 text-emerald-700 hover:bg-emerald-100">
              Shop categories
            </Badge>
            <h1 className="text-3xl font-semibold text-slate-900">
              Explore HealthMart categories
            </h1>
            <p className="max-w-2xl text-sm text-slate-600">
              Find trusted medicines, wellness essentials, and care products by
              category. Each category is curated by licensed sellers and vetted
              for quality.
            </p>
          </div>
          <Button asChild variant="outline" size="sm">
            <Link href="/medicines" className="gap-2">
              Browse all medicines
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        {categories.length === 0 ? (
          <Card className="border-emerald-100/60 bg-white/80 shadow-sm">
            <CardHeader>
              <CardTitle className="text-base">No categories yet</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-600">
              We are updating our catalog. Please check back soon.
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {categories.map((category) => {
              const Icon = iconMap[category.name] ?? Pill;

              return (
                <Link
                  key={category.id}
                  href={`/medicines?category=${category.id}`}
                  className="group"
                >
                  <Card className="h-full border-slate-200/70 bg-white/90 transition-all duration-200 group-hover:-translate-y-1 group-hover:border-emerald-200 group-hover:shadow-md">
                    <CardHeader className="space-y-3">
                      <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                        <Icon className="h-5 w-5" />
                      </div>
                      <CardTitle className="text-base text-slate-900">
                        {category.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm text-slate-600">
                      {category.description ??
                        "Shop verified products in this category."}
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
