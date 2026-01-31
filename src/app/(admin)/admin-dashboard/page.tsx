import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminOverview() {
  return (
    <div className="space-y-6">
       <h2 className="text-2xl font-bold">System Overview</h2>
       <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader><CardTitle className="text-sm font-medium">Total Users</CardTitle></CardHeader>
            <CardContent><div className="text-2xl font-bold">--</div></CardContent>
          </Card>
           <Card>
            <CardHeader><CardTitle className="text-sm font-medium">Total Orders</CardTitle></CardHeader>
            <CardContent><div className="text-2xl font-bold">--</div></CardContent>
          </Card>
           <Card>
            <CardHeader><CardTitle className="text-sm font-medium">Total Revenue</CardTitle></CardHeader>
            <CardContent><div className="text-2xl font-bold">$0.00</div></CardContent>
          </Card>
           <Card>
            <CardHeader><CardTitle className="text-sm font-medium">Pending Requests</CardTitle></CardHeader>
            <CardContent><div className="text-2xl font-bold">--</div></CardContent>
          </Card>
       </div>
    </div>
  );
}
