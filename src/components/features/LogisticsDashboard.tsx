import { Truck, ArrowUpRight } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const logisticsData = [
  { day: 'Mon', deliveries: 42, delays: 3 },
  { day: 'Tue', deliveries: 38, delays: 1 },
  { day: 'Wed', deliveries: 45, delays: 2 },
  { day: 'Thu', deliveries: 50, delays: 4 },
  { day: 'Fri', deliveries: 47, delays: 2 },
];

interface LogisticsDashboardProps {
  expandedView?: boolean;
}

export default function LogisticsDashboard({ 
  expandedView = false 
}: LogisticsDashboardProps) {
  const navigate = useNavigate();

  return (
    <div className={expandedView ? 'space-y-6' : 'space-y-2 h-full'}>
      {expandedView ? (
        <>
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Logistics Performance</h2>
            <Button 
              onClick={() => navigate('/dashboard')}
              variant="outline"
              size="sm"
            >
              Back to Dashboard
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-4 rounded-lg shadow border">
              <h3 className="font-semibold mb-4">Daily Deliveries</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={logisticsData}>
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="deliveries" fill="#8884d8" name="Completed Deliveries" />
                    <Bar dataKey="delays" fill="#ff7300" name="Delayed Deliveries" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow border">
              <h3 className="font-semibold mb-4">Key Metrics</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm text-muted-foreground">On-time Rate</p>
                  <p className="text-2xl font-bold">94.5%</p>
                </div>
                <div className="p-3 bg-green-50 rounded-lg">
                  <p className="text-sm text-muted-foreground">Avg Delivery Time</p>
                  <p className="text-2xl font-bold">2.3h</p>
                </div>
                <div className="p-3 bg-orange-50 rounded-lg">
                  <p className="text-sm text-muted-foreground">Delays This Week</p>
                  <p className="text-2xl font-bold">12</p>
                </div>
                <div className="p-3 bg-purple-50 rounded-lg">
                  <p className="text-sm text-muted-foreground">Vehicles Active</p>
                  <p className="text-2xl font-bold">18/20</p>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <Truck className="h-4 w-4" />
              Logistics
            </h2>
            <Button 
              onClick={() => navigate('/features/logistics')}
              variant="ghost" 
              size="sm" 
              className="text-muted-foreground hover:text-primary"
            >
              <ArrowUpRight className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="h-[calc(100%-32px)]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={logisticsData}>
                <XAxis dataKey="day" />
                <YAxis hide />
                <Tooltip formatter={(value) => [`${value} deliveries`, 'Completed']} />
                <Bar dataKey="deliveries" fill="#8884d8" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </>
      )}
    </div>
  );
}