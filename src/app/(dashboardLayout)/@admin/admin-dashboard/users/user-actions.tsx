"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { useTransition } from "react";
import { updateUserStatus } from "@/actions/admin.actions";
import { toast } from "sonner";

export type AdminUser = {
  id: string;
  name: string;
  email: string;
  role: "ADMIN" | "SELLER" | "CUSTOMER";
  status: "ACTIVE" | "BANNED";
};

export function UserActions({ user }: { user: AdminUser }) {
  const [isPending, startTransition] = useTransition();

  const toggleStatus = () => {
    startTransition(async () => {
      const result = await updateUserStatus(
        user.id,
        user.status === "ACTIVE" ? "BANNED" : "ACTIVE"
      );

      if (result.success) {
        toast.success(
          `User ${user.status === "ACTIVE" ? "banned" : "activated"} successfully`
        );
      } else {
        toast.error(result.error);
      }
    });
  };

  // Prevent banning ADMIN users
  if (user.role === "ADMIN") {
    return (
      <Button size="icon" variant="ghost" disabled title="Cannot perform actions on Admin">
        <MoreHorizontal className="h-4 w-4" />
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="icon" variant="ghost" disabled={isPending}>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={toggleStatus}>
          {user.status === "ACTIVE" ? "Ban User" : "Activate User"}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
