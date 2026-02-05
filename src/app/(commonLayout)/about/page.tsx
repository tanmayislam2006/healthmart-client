import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function AboutPage() {
  return (
    <div className="relative">
      <div className="absolute inset-x-0 top-0 h-80 bg-gradient-to-b from-sky-100/70 via-white to-transparent" />
      <div className="relative container mx-auto space-y-12 px-6 py-12">
        <section className="space-y-4">
          <Badge className="w-fit bg-sky-100 text-sky-700 hover:bg-sky-100">
            About HealthMart
          </Badge>
          <h1 className="text-3xl font-semibold text-slate-900">
            Built for reliable, everyday healthcare
          </h1>
          <p className="max-w-2xl text-sm text-slate-600">
            HealthMart connects licensed sellers with customers who need safe,
            verified medicines. Our marketplace is designed to keep inventory
            transparent, deliveries traceable, and care accessible.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button asChild size="sm">
              <Link href="/medicines">Browse medicines</Link>
            </Button>
            <Button asChild variant="outline" size="sm">
              <Link href="/categories">Shop by category</Link>
            </Button>
          </div>
        </section>

        <section className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
          <Card className="border-slate-200/70 bg-white/90">
            <CardHeader>
              <CardTitle>Our mission</CardTitle>
              <CardDescription>Care that feels dependable.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-slate-600">
              <p>
                We believe trusted healthcare should be easy to access. Our
                platform brings together verified sellers, transparent
                pricing, and a customer experience designed around safety and
                clarity.
              </p>
              <p>
                Every category is curated so customers can find the right
                product quickly, whether it is for everyday wellness or urgent
                needs.
              </p>
            </CardContent>
          </Card>

          <Card className="border-slate-200/70 bg-white/90">
            <CardHeader>
              <CardTitle>What we promise</CardTitle>
              <CardDescription>Quality you can rely on.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-slate-600">
              <div className="rounded-lg border border-slate-200/70 bg-slate-50 p-3">
                Verified sellers with compliant listings
              </div>
              <div className="rounded-lg border border-slate-200/70 bg-slate-50 p-3">
                Clear order tracking from checkout to delivery
              </div>
              <div className="rounded-lg border border-slate-200/70 bg-slate-50 p-3">
                Category insights to guide smarter choices
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          <Card className="border-slate-200/70 bg-white/90">
            <CardHeader>
              <CardTitle className="text-2xl text-slate-900">
                Trusted supply
              </CardTitle>
              <CardDescription>Licensed partners</CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-slate-600">
              We work only with verified sellers so every listing is a safe
              choice.
            </CardContent>
          </Card>

          <Card className="border-slate-200/70 bg-white/90">
            <CardHeader>
              <CardTitle className="text-2xl text-slate-900">
                Transparent data
              </CardTitle>
              <CardDescription>Know what you buy</CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-slate-600">
              Pricing, availability, and order history are always visible.
            </CardContent>
          </Card>

          <Card className="border-slate-200/70 bg-white/90">
            <CardHeader>
              <CardTitle className="text-2xl text-slate-900">
                Fast support
              </CardTitle>
              <CardDescription>We are here to help</CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-slate-600">
              Our team is ready to help with orders, returns, and questions.
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}
