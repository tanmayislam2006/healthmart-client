import { Footer } from "@/components/Layout/Footer";
import { Header } from "@/components/Layout/Header";

export default function CommonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-[calc(100vh-128px)]">
      <Header />
      {children}
      <Footer />
    </div>
  );
}
