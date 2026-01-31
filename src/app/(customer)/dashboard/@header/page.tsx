export default function Header() {
  return (
    <header className="h-16 border-b bg-white flex items-center px-6 justify-between">
      <h1 className="font-semibold text-lg">Dashboard</h1>
      <div className="flex items-center gap-4">
         <span className="text-sm text-gray-500">Welcome back</span>
      </div>
    </header>
  );
}
