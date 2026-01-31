export default function SellerDashboardLayout({
  children,
  sidebar,
  header,
}: {
  children: React.ReactNode;
  sidebar: React.ReactNode;
  header: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      {sidebar}
      <div className="flex-1 flex flex-col">
        {header}
        <main className="flex-1 p-6 bg-gray-50 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
