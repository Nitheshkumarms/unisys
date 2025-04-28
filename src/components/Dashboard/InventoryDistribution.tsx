import { Package, Plus, Minus, Warehouse, Box } from "lucide-react";
import { DashboardCard } from "./DashboardCard";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const inventoryData = [
  { id: "P1001", name: "Laptop", quantity: 42, location: "WH-A1", threshold: 10 },
  { id: "P1002", name: "Monitor", quantity: 35, location: "WH-A2", threshold: 8 },
  { id: "P1003", name: "Keyboard", quantity: 120, location: "WH-B1", threshold: 20 },
  { id: "P1004", name: "Mouse", quantity: 85, location: "WH-B2", threshold: 15 },
  { id: "P1005", name: "Headset", quantity: 28, location: "WH-C1", threshold: 5 },
];

const movementData = [
  { name: "Jan", incoming: 400, outgoing: 240 },
  { name: "Feb", incoming: 300, outgoing: 139 },
  { name: "Mar", incoming: 600, outgoing: 480 },
  { name: "Apr", incoming: 800, outgoing: 520 },
  { name: "May", incoming: 500, outgoing: 380 },
];

export default function InventoryManagement() {
  return (
    <DashboardCard
      title="Inventory Management"
      icon={<Warehouse className="h-5 w-5" />}
    >
      <div className="flex flex-col h-full">
        {/* Main content area that grows */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-4 min-h-[400px]">
          {/* Inventory List - Fixed height with scroll */}
          <div className="border rounded-lg p-3 flex flex-col">
            <h3 className="font-medium flex items-center gap-2 mb-3">
              <Package className="h-4 w-4" />
              Current Inventory
            </h3>
            <div className="flex-1 overflow-y-auto">
              {inventoryData.map(item => (
                <div key={item.id} className="flex items-center justify-between py-2 border-b last:border-b-0">
                  <div className="w-[140px] truncate">
                    <h4 className="font-medium truncate">{item.name}</h4>
                    <p className="text-xs text-muted-foreground truncate">
                      {item.location} • Threshold: {item.threshold}
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="h-8 w-8 p-0"
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className={`w-10 text-center ${item.quantity <= item.threshold ? "text-red-600 font-bold" : ""}`}>
                      {item.quantity}
                    </span>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="h-8 w-8 p-0"
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Inventory Movement Chart - Fixed height */}
          <div className="border rounded-lg p-3 flex flex-col">
            <h3 className="font-medium flex items-center gap-2 mb-3">
              <Box className="h-4 w-4" />
              Monthly Movement
            </h3>
            <div className="flex-1 min-h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={movementData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="incoming" fill="#4CAF50" name="Incoming" />
                  <Bar dataKey="outgoing" fill="#F44336" name="Outgoing" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Summary footer - Fixed height */}
        <div className="mt-4 flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span>In Stock: {inventoryData.reduce((sum, item) => sum + item.quantity, 0)}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <span>Low Stock Items: {inventoryData.filter(item => item.quantity <= item.threshold).length}</span>
          </div>
        </div>
      </div>
    </DashboardCard>
  );
}