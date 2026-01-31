import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function SellerOverview() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Dashboard Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader><CardTitle className="text-sm font-medium">Total Sales</CardTitle></CardHeader>
          <CardContent className="text-2xl font-bold">$0.00</CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle className="text-sm font-medium">Total Orders</CardTitle></CardHeader>
          <CardContent className="text-2xl font-bold">0</CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle className="text-sm font-medium">Medicines Listed</CardTitle></CardHeader>
          <CardContent className="text-2xl font-bold">0</CardContent>
        </Card>
      </div>
    </div>
  );
}
