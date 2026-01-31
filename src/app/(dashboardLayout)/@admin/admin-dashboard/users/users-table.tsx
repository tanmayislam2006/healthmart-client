"use client";

import { ColumnDef } from "@tanstack/react-table";
import { useTransition } from "react";
import { Badge } from "@/components/ui/badge";
import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";

export type AdminUser = {
  id: string;
  name: string;
  email: string;
  role: "ADMIN" | "SELLER" | "CUSTOMER";
  status: "ACTIVE" | "BANNED";
};

export function UsersTable({
  data,
  onToggle,
}: {
  data: AdminUser[];
  onToggle: (userId: string, status: "ACTIVE" | "BANNED") => Promise<void>;
}) {
  const [isPending, startTransition] = useTransition();

  const columns: ColumnDef<AdminUser>[] = [
    { accessorKey: "name", header: "Name" },
    { accessorKey: "email", header: "Email" },
    { accessorKey: "id", header: "ID" },
    {
      accessorKey: "role",
      header: "Role",
      cell: ({ row }) => <Badge variant="secondary">{row.original.role}</Badge>,
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <Badge
          variant={row.original.status === "ACTIVE" ? "default" : "destructive"}
        >
          {row.original.status}
        </Badge>
      ),
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const user = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="icon" variant="ghost" disabled={isPending}>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={() =>
                  startTransition(() =>
                    onToggle(
                      user.id,
                      user.status === "ACTIVE" ? "BANNED" : "ACTIVE",
                    ),
                  )
                }
              >
                {user.status === "ACTIVE" ? "Ban User" : "Activate User"}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  return <DataTable columns={columns} data={data} />;
}
