import React from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Cell
} from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Sample data for charts
const orderData = [
  { month: "Jan", orders: 350, previousYear: 300 },
  { month: "Feb", orders: 400, previousYear: 320 },
  { month: "Mar", orders: 500, previousYear: 340 },
  { month: "Apr", orders: 470, previousYear: 360 },
  { month: "May", orders: 420, previousYear: 380 },
  { month: "Jun", orders: 500, previousYear: 400 },
  { month: "Jul", orders: 600, previousYear: 420 },
  { month: "Aug", orders: 700, previousYear: 450 },
  { month: "Sep", orders: 800, previousYear: 480 },
  { month: "Oct", orders: 880, previousYear: 510 },
  { month: "Nov", orders: 950, previousYear: 540 },
  { month: "Dec", orders: 1000, previousYear: 580 },
];

const inventoryData = [
  { category: "Raw Materials", value: 35 },
  { category: "WIP", value: 20 },
  { category: "Finished Goods", value: 45 },
];

const leadTimeData = [
  { supplier: "Supplier A", leadTime: 12 },
  { supplier: "Supplier B", leadTime: 8 },
  { supplier: "Supplier C", leadTime: 15 },
  { supplier: "Supplier D", leadTime: 10 },
  { supplier: "Supplier E", leadTime: 6 },
];

const COLORS = [
  "#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8",
  "#82CA9D", "#A4DE6C", "#D0ED57", "#FAD000"
];

interface ChartSectionProps {
  showOrders?: boolean;
  showInventory?: boolean;
  showLeadTimes?: boolean;
}

const ChartSection = ({
  showOrders = true,
  showInventory = true,
  showLeadTimes = true
}: ChartSectionProps) => {
  return (
    <div className="grid gap-6 md:grid-cols-2 mb-6">
      {showOrders && (
        <Card>
          <CardHeader>
            <CardTitle>Orders Trend</CardTitle>
            <CardDescription>
              Monthly order volume comparison
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="area">
              <TabsList className="mb-4">
                <TabsTrigger value="area">Area</TabsTrigger>
                <TabsTrigger value="line">Line</TabsTrigger>
              </TabsList>
              <TabsContent value="area" className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={orderData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip 
                      contentStyle={{ backgroundColor: "white", borderRadius: "8px" }} 
                    />
                    <Legend />
                    <Area 
                      type="monotone" 
                      dataKey="orders" 
                      name="This Year" 
                      stroke="#0070f3" 
                      fill="#0070f3" 
                      fillOpacity={0.2} 
                    />
                    <Area 
                      type="monotone" 
                      dataKey="previousYear" 
                      name="Last Year" 
                      stroke="#6b7280" 
                      fill="#6b7280" 
                      fillOpacity={0.1} 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </TabsContent>
              <TabsContent value="line" className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={orderData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip 
                      contentStyle={{ backgroundColor: "white", borderRadius: "8px" }} 
                    />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="orders" 
                      name="This Year" 
                      stroke="#0070f3" 
                      activeDot={{ r: 8 }} 
                    />
                    <Line 
                      type="monotone" 
                      dataKey="previousYear" 
                      name="Last Year" 
                      stroke="#6b7280" 
                    />
                  </LineChart>
                </ResponsiveContainer>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}
      
      {showInventory && (
        <Card>
          <CardHeader>
            <CardTitle>Inventory Distribution</CardTitle>
            <CardDescription>
              Current inventory by category
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="pie">
              <TabsList className="mb-4">
                <TabsTrigger value="pie">Pie</TabsTrigger>
                <TabsTrigger value="bar">Bar</TabsTrigger>
              </TabsList>
              <TabsContent value="pie" className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={inventoryData}
                      cx="50%"
                      cy="50%"
                      labelLine={true}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {inventoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ backgroundColor: "white", borderRadius: "8px" }} 
                    />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </TabsContent>
              <TabsContent value="bar" className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={inventoryData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="category" />
                    <YAxis />
                    <Tooltip 
                      contentStyle={{ backgroundColor: "white", borderRadius: "8px" }} 
                    />
                    <Legend />
                    <Bar dataKey="value" name="Percentage" fill="#0070f3" />
                  </BarChart>
                </ResponsiveContainer>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}
      
      {showLeadTimes && (
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Supplier Lead Times</CardTitle>
            <CardDescription>
              Average lead time by supplier (in days)
            </CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={leadTimeData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="supplier" type="category" width={100} />
                <Tooltip 
                  contentStyle={{ backgroundColor: "white", borderRadius: "8px" }} 
                />
                <Legend />
                <Bar dataKey="leadTime" name="Lead Time (Days)" fill="#0070f3">
                  {leadTimeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ChartSection;