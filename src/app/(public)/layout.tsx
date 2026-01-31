import Link from "next/link";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b bg-white">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link href="/" className="text-xl font-bold text-blue-600">Health Mart</Link>
          <nav className="flex gap-6 text-sm font-medium">
             <Link href="/medicine" className="hover:underline">Medicines</Link>
             <Link href="/medicine/category" className="hover:underline">Categories</Link>
             <Link href="/sign-in" className="hover:underline">Login</Link>
          </nav>
        </div>
      </header>
      <main className="flex-1">{children}</main>
      <footer className="border-t py-6 text-center text-sm text-gray-500 bg-gray-50">
        © 2024 Health Mart. All rights reserved.
      </footer>
    </div>
  );
}
