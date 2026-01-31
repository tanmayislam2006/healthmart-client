"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { DataTable } from "@/components/data-table";
import { UserActions, AdminUser } from "./user-actions";

export function UsersTable({ data }: { data: AdminUser[] }) {

  const columns: ColumnDef<AdminUser>[] = [
    { accessorKey: "name", header: "Name" },
    { accessorKey: "email", header: "Email" },
    {
      accessorKey: "role",
      header: "Role",
      cell: ({ row }) => (
        <Badge variant="secondary">{row.original.role}</Badge>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <Badge
          variant={
            row.original.status === "ACTIVE"
              ? "default"
              : "destructive"
          }
        >
          {row.original.status}
        </Badge>
      ),
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <UserActions
          user={row.original}
        />
      ),
    },
  ];

  return <DataTable columns={columns} data={data} />;
}
