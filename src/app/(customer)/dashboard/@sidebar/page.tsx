import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white border-r h-screen sticky top-0 flex flex-col hidden md:flex">
      <div className="p-6 border-b">
         <Link href="/" className="text-xl font-bold block">Health Mart</Link>
         <span className="text-xs text-gray-500">Customer Panel</span>
      </div>
      <nav className="flex-1 p-4 space-y-2">
         <Button variant="ghost" asChild className="w-full justify-start">
            <Link href="/dashboard">Overview</Link>
         </Button>
         <Button variant="ghost" asChild className="w-full justify-start">
            <Link href="/dashboard/orders">My Orders</Link>
         </Button>
         <Button variant="ghost" asChild className="w-full justify-start">
            <Link href="/dashboard/profile">Profile</Link>
         </Button>
      </nav>
      <div className="p-4 border-t">
         <Button variant="outline" className="w-full">Sign Out</Button>
      </div>
    </aside>
  );
}
