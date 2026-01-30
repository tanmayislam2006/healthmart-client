import {
  ShieldCheck,
  Truck,
  BadgeCheck,
  Headphones,
} from "lucide-react";

export function WhyChooseUs() {
  return (
    <section className="py-16">
      <div className="container">
        {/* Header */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold sm:text-3xl">
            Why Choose Health Mart
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Trusted healthcare, delivered with care
          </p>
        </div>

        {/* Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <Feature
            icon={ShieldCheck}
            title="100% Genuine Medicines"
            description="All products are verified and sourced from licensed sellers."
          />

          <Feature
            icon={Truck}
            title="Fast & Reliable Delivery"
            description="Quick dispatch and doorstep delivery you can depend on."
          />

          <Feature
            icon={BadgeCheck}
            title="Licensed Sellers Only"
            description="We work only with approved pharmacies and vendors."
          />

          <Feature
            icon={Headphones}
            title="Dedicated Support"
            description="Our support team is always ready to help you."
          />
        </div>
      </div>
    </section>
  );
}

/* ---------- Feature Card ---------- */

function Feature({
  icon: Icon,
  title,
  description,
}: {
  icon: any;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-xl border bg-background p-6 text-center transition hover:shadow-md">
      <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
        <Icon className="h-6 w-6" />
      </div>

      <h3 className="text-sm font-semibold">{title}</h3>
      <p className="mt-2 text-xs text-muted-foreground">{description}</p>
    </div>
  );
}
