import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { userService } from "@/service/user.service";
import { Role } from "@/constant/role";
import { redirect } from "next/navigation";

type DashboardLayoutProps = {
  admin: React.ReactNode;
  seller: React.ReactNode;
  customer: React.ReactNode;
};

export default async function DashboardLayout({
  admin,
  seller,
  customer,
}: DashboardLayoutProps) {
  const { data } = await userService.getSessionUser();

  const role = data?.user.role;

  const renderDashboard = () => {
    switch (role) {
      case Role.admin:
        return admin;
      case Role.seller:
        return seller;
      case Role.customer:
        return customer;
      default:
        return null;
    }
  };


  const dashboardLink =
    role === Role.admin
      ? "/admin-dashboard"
      : role === Role.seller
        ? "/seller-dashboard"
        : "/dashboard";

  return (
    <SidebarProvider>
      <AppSidebar user={data?.user} />

      <SidebarInset>
        {/* Header */}
        <header className="flex h-16 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />

          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />

          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href={dashboardLink}>Dashboard</BreadcrumbLink>
              </BreadcrumbItem>

              <BreadcrumbSeparator className="hidden md:block" />

              <BreadcrumbItem>
                <BreadcrumbPage className="capitalize">
                  {role?.toLowerCase()}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>

        <main className="p-4">{renderDashboard()}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
