import { redirect } from "next/navigation";

import { ProfileOverview } from "@/components/modules/profile/ProfileOverview";
import { userService } from "@/service/user.service";

export default async function SellerProfilePage() {
  const { data } = await userService.getSessionUser();

  if (!data?.user) {
    redirect("/sign-in");
  }

  return <ProfileOverview user={data.user} />;
}

