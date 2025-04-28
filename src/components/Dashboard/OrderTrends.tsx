import { ShoppingCart, TrendingUp, Calendar } from "lucide-react";
import { DashboardCard } from "./DashboardCard";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  ResponsiveContainer 
} from 'recharts';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const orderTrendsData = [
  { month: 'Jan', orders: 420, revenue: 125000 },
  { month: 'Feb', orders: 380, revenue: 112000 },
  { month: 'Mar', orders: 540, revenue: 162000 },
  { month: 'Apr', orders: 610, revenue: 183000 },
  { month: 'May', orders: 490, revenue: 147000 },
  { month: 'Jun', orders: 680, revenue: 204000 },
];

const topProducts = [
  { name: "Laptop Pro", orders: 320 },
  { name: "Ultra Monitor", orders: 280 },
  { name: "Mechanical Keyboard", orders: 190 },
];

export default function OrderTrends() {
  return (
    <DashboardCard
      title="Order Trends"
      icon={<ShoppingCart className="h-5 w-5" />}
    >
      <div className="flex flex-col h-full">
        {/* Header with controls */}
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-medium flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Sales Performance
          </h3>
          <Select defaultValue="6months">
            <SelectTrigger className="w-[150px]">
              <Calendar className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="3months">3 Months</SelectItem>
              <SelectItem value="6months">6 Months</SelectItem>
              <SelectItem value="12months">12 Months</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Main content area */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-4 min-h-[300px]">
          {/* Chart - Takes full height */}
          <div className="border rounded-lg p-3 flex flex-col">
            <div className="flex-1 min-h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={orderTrendsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Legend />
                  <Line 
                    yAxisId="left"
                    type="monotone" 
                    dataKey="orders" 
                    stroke="#8884d8" 
                    strokeWidth={2}
                    name="Orders"
                  />
                  <Line 
                    yAxisId="right"
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="#82ca9d" 
                    strokeWidth={2}
                    name="Revenue ($)"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Top Products - Fixed height with scroll */}
          <div className="border rounded-lg p-3 flex flex-col">
            <h3 className="font-medium flex items-center gap-2 mb-3">
              <ShoppingCart className="h-3 w-20" />
              Top Products
            </h3>
            <div className="flex-1 overflow-y-auto">
              {topProducts.map((product, index) => (
                <div key={product.name} className="flex items-center justify-between py-2 border-b last:border-b-0">
                  <div className="flex items-center gap-5">
                    <span className="font-medium text-muted-foreground w-5">{index + 1}</span>
                    <span className="truncate">{product.name}</span>
                  </div>
                  <span className="font-medium">{product.orders} orders</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Summary footer */}
        <div className="mt-4 grid grid-cols-2 gap-4">
          <div className="bg-gray-50 p-3 rounded-lg">
            <p className="text-sm text-muted-foreground">Total Orders</p>
            <p className="text-xl font-bold">
              {orderTrendsData.reduce((sum, month) => sum + month.orders, 0)}
            </p>
          </div>
          <div className="bg-gray-50 p-3 rounded-lg">
            <p className="text-sm text-muted-foreground">Total Revenue</p>
            <p className="text-xl font-bold">
              ${orderTrendsData.reduce((sum, month) => sum + month.revenue, 0).toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </DashboardCard>
  );
}