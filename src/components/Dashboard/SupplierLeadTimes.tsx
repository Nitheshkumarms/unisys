// src/components/Dashboard/SupplierLeadTimes.tsx
import { Clock } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LabelList
} from "recharts";

const leadTimeData = [
  { supplier: 'Supplier A', leadTime: 14, target: 10 },
  { supplier: 'Supplier B', leadTime: 21, target: 15 },
  { supplier: 'Supplier C', leadTime: 8, target: 10 },
  { supplier: 'Supplier D', leadTime: 18, target: 12 },
  { supplier: 'Supplier E', leadTime: 12, target: 10 },
];

export default function SupplierLeadTimes() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Supplier Lead Times (Days)
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={leadTimeData}
              layout="vertical"
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="supplier" type="category" width={80} />
              <Tooltip />
              <Bar dataKey="target" fill="#8884d8" radius={[0, 4, 4, 0]}>
                <LabelList dataKey="target" position="right" />
              </Bar>
              <Bar dataKey="leadTime" fill="#82ca9d" radius={[0, 4, 4, 0]}>
                <LabelList dataKey="leadTime" position="right" />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="flex justify-center gap-4 mt-4">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-[#8884d8] rounded"></div>
            <span className="text-sm">Target Lead Time</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-[#82ca9d] rounded"></div>
            <span className="text-sm">Actual Lead Time</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}