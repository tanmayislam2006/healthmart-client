import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function SellerSidebar() {
  return (
    <aside className="w-64 bg-slate-900 text-white border-r h-screen sticky top-0 flex flex-col hidden md:flex">
      <div className="p-6 border-b border-slate-800">
         <Link href="/" className="text-xl font-bold">Seller Portal</Link>
      </div>
      <nav className="flex-1 p-4 space-y-2">
         <Button variant="ghost" asChild className="w-full justify-start hover:bg-slate-800 hover:text-white">
            <Link href="/seller-dashboard">Overview</Link>
         </Button>
         <Button variant="ghost" asChild className="w-full justify-start hover:bg-slate-800 hover:text-white">
            <Link href="/seller-dashboard/medicines">My Medicines</Link>
         </Button>
         <Button variant="ghost" asChild className="w-full justify-start hover:bg-slate-800 hover:text-white">
            <Link href="/seller-dashboard/add-medicine">Add Medicine</Link>
         </Button>
         <Button variant="ghost" asChild className="w-full justify-start hover:bg-slate-800 hover:text-white">
            <Link href="/seller-dashboard/orders">Seller Orders</Link>
         </Button>
      </nav>
      <div className="p-4 border-t border-slate-800">
         <Button variant="secondary" className="w-full">Sign Out</Button>
      </div>
    </aside>
  );
}
