import { Warehouse, ArrowUpRight, Box, Palette, PackageCheck, PackageX } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const warehouseData = [
  { location: 'Zone A', capacity: 400, used: 240 },
  { location: 'Zone B', capacity: 300, used: 189 },
  { location: 'Zone C', capacity: 200, used: 98 },
  { location: 'Zone D', capacity: 500, used: 320 },
];

const inventoryStatusData = [
  { name: 'In Stock', value: 78, color: '#00C49F' },
  { name: 'Low Stock', value: 12, color: '#FFBB28' },
  { name: 'Out of Stock', value: 5, color: '#FF8042' },
];

interface WarehouseDashboardProps {
  expandedView?: boolean;
}

export default function WarehouseDashboard({ 
  expandedView = false 
}: WarehouseDashboardProps) {
  const navigate = useNavigate();

  return (
    <div className={expandedView ? 'space-y-6' : 'space-y-2 h-full'}>
      {expandedView ? (
        <>
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Warehouse Management</h2>
            <Button 
              onClick={() => navigate('/dashboard')}
              variant="outline"
              size="sm"
            >
              Back to Dashboard
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="col-span-2">
              <CardHeader>
                <CardTitle>Storage Utilization by Zone</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={warehouseData}>
                      <XAxis dataKey="location" />
                      <YAxis />
                      <Tooltip 
                        formatter={(value) => [`${value} pallets`, 'Capacity']}
                        labelFormatter={(label) => `Zone ${label}`}
                      />
                      <Bar dataKey="used" fill="#8884d8" name="Used" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="capacity" fill="#82ca9d" name="Total" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Inventory Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={inventoryStatusData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {inventoryStatusData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip 
                        formatter={(value, name, props) => [
                          `${value} items`,
                          props.payload.name
                        ]}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-3 col-span-3 gap-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Items
                  </CardTitle>
                  <Box className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">1,248</div>
                  <p className="text-xs text-muted-foreground">
                    +12% from last month
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Categories
                  </CardTitle>
                  <Palette className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">24</div>
                  <p className="text-xs text-muted-foreground">
                    5 new this quarter
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Inventory Accuracy
                  </CardTitle>
                  <PackageCheck className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">98.7%</div>
                  <p className="text-xs text-muted-foreground">
                    Last audit: 2 days ago
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <Warehouse className="h-4 w-4" />
              Warehouse
            </h2>
            <Button 
              onClick={() => navigate('/features/warehouse')}
              variant="ghost" 
              size="sm" 
              className="text-muted-foreground hover:text-primary"
            >
              <ArrowUpRight className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="h-[calc(100%-32px)]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={warehouseData}>
                <XAxis dataKey="location" />
                <YAxis hide />
                <Tooltip 
                  formatter={(value, name) => [
                    `${value} pallets`, 
                    name === 'used' ? 'Used' : 'Capacity'
                  ]}
                />
                <Bar dataKey="used" fill="#8884d8" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </>
      )}
    </div>
  );
}