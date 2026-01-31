import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function AdminSidebar() {
  return (
    <aside className="w-64 bg-slate-800 text-white border-r h-screen sticky top-0 flex flex-col hidden md:flex">
      <div className="p-6 border-b border-slate-700">
         <Link href="/" className="text-xl font-bold text-red-400">Admin Panel</Link>
      </div>
      <nav className="flex-1 p-4 space-y-2">
         <Button variant="ghost" asChild className="w-full justify-start hover:bg-slate-700 hover:text-white text-white">
            <Link href="/admin-dashboard">Overview</Link>
         </Button>
         <Button variant="ghost" asChild className="w-full justify-start hover:bg-slate-700 hover:text-white text-white">
            <Link href="/admin-dashboard/users">Users</Link>
         </Button>
         <Button variant="ghost" asChild className="w-full justify-start hover:bg-slate-700 hover:text-white text-white">
            <Link href="/admin-dashboard/orders">Orders</Link>
         </Button>
         <Button variant="ghost" asChild className="w-full justify-start hover:bg-slate-700 hover:text-white text-white">
            <Link href="/admin-dashboard/medicines">Medicines</Link>
         </Button>
         <Button variant="ghost" asChild className="w-full justify-start hover:bg-slate-700 hover:text-white text-white">
            <Link href="/admin-dashboard/categories">Categories</Link>
         </Button>
         <Button variant="ghost" asChild className="w-full justify-start hover:bg-slate-700 hover:text-white text-white">
            <Link href="/admin-dashboard/seller-request">Seller Requests</Link>
         </Button>
      </nav>
       <div className="p-4 border-t border-slate-700">
         <Button variant="destructive" className="w-full">Sign Out</Button>
      </div>
    </aside>
  );
}
