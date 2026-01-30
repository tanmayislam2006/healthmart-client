import { Footer } from "@/components/Layout/Footer";
import { Header } from "@/components/Layout/Header";
import { userService } from "@/service/user.service";

export default async function CommonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data } = await userService.getSessionUser();
  return (
    <>
      <Header
        user={data?.user}
        cartCount={2} 
      />
      <div className="min-h-[calc(100vh-128px)]">{children}</div>
      <Footer />
    </>
  );
}
