// "use client";


// import { AdminUser } from "./users-table";

// import { Button } from "@/components/ui/button";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { MoreHorizontal } from "lucide-react";
// import { useTransition } from "react";

// export function UserActions({ user }: { user: AdminUser }) {
//   const [isPending, startTransition] = useTransition();

//   const toggleStatus = () => {
//     startTransition(async () => {
//       await updateUserStatus(
//         user.id,
//         user.status === "ACTIVE" ? "BANNED" : "ACTIVE"
//       );
//     });
//   };

//   return (
//     <DropdownMenu>
//       <DropdownMenuTrigger asChild>
//         <Button size="icon" variant="ghost" disabled={isPending}>
//           <MoreHorizontal className="h-4 w-4" />
//         </Button>
//       </DropdownMenuTrigger>

//       <DropdownMenuContent align="end">
//         <DropdownMenuItem onClick={toggleStatus}>
//           {user.status === "ACTIVE" ? "Ban User" : "Activate User"}
//         </DropdownMenuItem>
//       </DropdownMenuContent>
//     </DropdownMenu>
//   );
// }
