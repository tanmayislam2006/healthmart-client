import Link from "next/link";
import { ShoppingCart, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { featuredProducts } from "@/lib/dummy-featured-products";

export function FeaturedProducts() {
  return (
    <section className="py-16">
      <div className="container">
        {/* Header */}
        <div className="mb-10 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold">Featured Products</h2>
            <p className="text-sm text-muted-foreground">
              Top-selling medicines and supplements
            </p>
          </div>

          <Link
            href="/medicines"
            className="flex items-center gap-1 text-sm font-medium text-primary hover:underline"
          >
            View all
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featuredProducts.map((product) => (
            <div
              key={product.id}
              className="group rounded-xl border bg-background transition hover:shadow-md"
            >
              {/* Product Canvas */}
              <div className="relative flex h-40 items-center justify-center rounded-t-xl bg-primary/5">
                <span className="text-3xl font-bold text-primary">
                  {product.name.charAt(0)}
                </span>

                <Badge className="absolute right-3 top-3" variant="secondary">
                  {product.category}
                </Badge>
              </div>

              {/* Content */}
              <div className="space-y-3 p-4">
                <h3 className="text-sm font-semibold">{product.name}</h3>

                <p className="text-xs text-muted-foreground line-clamp-2">
                  {product.description}
                </p>

                <div className="flex items-end justify-between pt-2">
                  <div>
                    <p className="text-lg font-bold text-primary">
                      ${product.price}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {product.stock} in stock
                    </p>
                  </div>

                  <Button size="sm" className="gap-1">
                    <ShoppingCart className="h-4 w-4" />
                    Add
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
