import { Footer } from "@/components/Layout/Footer";
import { Header } from "@/components/Layout/Header";


export default async function CommonLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <>
      <Header/>
      <div className="min-h-[calc(100vh-128px)]">{children}</div>
      <Footer />
    </>
  );
}
