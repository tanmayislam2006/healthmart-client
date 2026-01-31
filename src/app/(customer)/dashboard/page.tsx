import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function DashboardOverview() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
          </CardHeader>
          <CardContent>
             <div className="text-2xl font-bold">--</div>
             <p className="text-xs text-gray-500">Orders placed so far</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
             <div className="text-2xl font-bold">--</div>
             <p className="text-xs text-gray-500">Items bought recently</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
