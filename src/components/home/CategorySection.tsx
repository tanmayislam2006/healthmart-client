import Link from "next/link";
import {
  Pill,
  HeartPulse,
  Brain,
  Bone,
  Eye,
  Baby,
  Leaf,
  Sparkles,
  ArrowRight,
} from "lucide-react";

import { categories } from "@/lib/dummy-categories";

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

export function CategorySection() {
  return (
    <section className="py-16">
      <div className="container">
        {/* Header */}
        <div className="mb-10 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold">Shop by Category</h2>
            <p className="text-sm text-muted-foreground">
              Find what you need quickly
            </p>
          </div>

          <Link
            href="/categories"
            className="flex items-center gap-1 text-sm font-medium text-primary hover:underline"
          >
            View all
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {categories.map((category) => {
            const Icon = iconMap[category.name] ?? Pill;

            return (
              <Link
                key={category.id}
                href={`/medicines?category=${category.id}`}
                className="group rounded-xl border bg-background p-5 transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-md"
              >
                <div className="mb-4 inline-flex rounded-lg bg-primary/10 p-3 text-primary">
                  <Icon className="h-5 w-5" />
                </div>

                <h3 className="text-sm font-semibold group-hover:text-primary">
                  {category.name}
                </h3>

                <p className="mt-1 text-xs text-muted-foreground line-clamp-2">
                  {category.description}
                </p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
