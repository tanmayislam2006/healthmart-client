import { CategorySection } from "@/components/home/CategorySection";
import { CTASection } from "@/components/home/CTASection";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { Hero } from "@/components/home/Hero";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";

export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <div className="">
      <main>
        <Hero />
        <div className="container mx-auto px-4">
          <CategorySection />
          <FeaturedProducts />
          <WhyChooseUs />
          <CTASection />
        </div>
      </main>
    </div>
  );
}
