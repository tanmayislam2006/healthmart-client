export default function SellerHeader() {
  return (
    <header className="h-16 border-b bg-white flex items-center px-6 justify-between shadow-sm">
      <h1 className="font-semibold text-lg text-slate-800">Seller Dashboard</h1>
      <div className="flex items-center gap-4">
         <span className="text-sm text-gray-500">Seller Mode</span>
      </div>
    </header>
  );
}
