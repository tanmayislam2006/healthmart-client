import { redirect } from "next/navigation";

import { SellerRequestForm } from "@/components/modules/customer/SellerRequestForm";
import { customerService } from "@/service/customer.service";
import { userService } from "@/service/user.service";

export default async function SellerRequestPage() {
  const { data } = await userService.getSessionUser();

  if (!data?.user) {
    redirect("/sign-in");
  }

  return (
    <div className="p-6">
      <SellerRequestForm
        user={{
          id: data.user.id,
          name: data.user.name,
          email: data.user.email,
        }}
        onSubmit={customerService.createSellerRequest}
      />
    </div>
  );
}

