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
import { MoreHorizontal, Check, X } from "lucide-react";


export type SellerRequest = {
  id: string;
  userId: string;
  address?: string | null;
  status: "PENDING" | "APPROVED" | "REJECT";
};

type Props = {
  data: SellerRequest[];
  onToggle: (
    requestId: string,
    status: "APPROVED" | "REJECT",
  ) => Promise<void>;
};


export function SellerRequestTable({ data, onToggle }: Props) {
  const [isPending, startTransition] = useTransition();

  const columns: ColumnDef<SellerRequest>[] = [
    {
      accessorKey: "id",
      header: "Request ID",
    },
    {
      accessorKey: "userId",
      header: "User ID",
    },
    {
      accessorKey: "address",
      header: "Address",
      cell: ({ row }) =>
        row.original.address ? (
          <span>{row.original.address}</span>
        ) : (
          <span className="italic text-muted-foreground">—</span>
        ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.original.status;

        return (
          <Badge
            variant={
              status === "APPROVED"
                ? "default"
                : status === "REJECT"
                ? "destructive"
                : "secondary"
            }
          >
            {status}
          </Badge>
        );
      },
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const req = row.original;

        if (req.status !== "PENDING") {
          return (
            <span className="text-sm text-muted-foreground">
              No actions
            </span>
          );
        }

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                size="icon"
                variant="ghost"
                disabled={isPending}
              >
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={() =>
                  startTransition(() =>
                    onToggle(req.id, "APPROVED"),
                  )
                }
              >
                <Check className="mr-2 h-4 w-4 text-green-600" />
                Approve
              </DropdownMenuItem>

              <DropdownMenuItem
                className="text-destructive"
                onClick={() =>
                  startTransition(() =>
                    onToggle(req.id, "REJECT"),
                  )
                }
              >
                <X className="mr-2 h-4 w-4" />
                Reject
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  return <DataTable columns={columns} data={data} />;
}
