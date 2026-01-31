import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <section className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight lg:text-5xl">
          Your Trusted Healthcare Partner
        </h1>
        <p className="mb-8 text-lg text-gray-600">
          Order medicines, consult sellers, and manage your health.
        </p>
        <Button asChild size="lg">
          <Link href="/medicine">
            Browse Medicines
          </Link>
        </Button>
      </section>
    </div>
  );
}
