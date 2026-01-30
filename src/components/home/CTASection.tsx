import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Store, ArrowRight } from "lucide-react";

export function CTASection() {
  return (
    <section className="py-16 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="relative overflow-hidden rounded-2xl bg-primary p-8 lg:p-12">
          {/* Background decoration */}
          <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute left-1/2 bottom-0 h-48 w-48 rounded-full bg-white/5 blur-2xl" />

          <div className="relative grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="space-y-4">
              <h2 className="font-display text-2xl font-bold text-primary-foreground sm:text-3xl lg:text-4xl">
                Become a Seller on Health Mart
              </h2>
              <p className="text-primary-foreground/80 max-w-md">
                Join our marketplace and reach thousands of customers looking
                for quality healthcare products. Easy setup, powerful tools, and
                dedicated support.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button size="lg" variant="secondary" asChild className="gap-2">
                  <Link href="/seller/apply">
                    <Store className="h-4 w-4" />
                    Start Selling
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="ghost"
                  asChild
                  className="text-primary-foreground hover:bg-white/10 hover:text-primary-foreground gap-1"
                >
                  <Link href="/about">
                    Learn More
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Active Sellers", value: "500+" },
                { label: "Products Listed", value: "10,000+" },
                { label: "Monthly Orders", value: "50,000+" },
                { label: "Customer Rating", value: "4.8★" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-xl bg-white/10 backdrop-blur p-4 text-center"
                >
                  <p className="font-display text-2xl font-bold text-primary-foreground">
                    {stat.value}
                  </p>
                  <p className="text-sm text-primary-foreground/70">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
