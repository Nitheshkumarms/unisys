import { Truck } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const deliveryData = [
  { courier: 'UPS', onTime: 85, delayed: 15 },
  { courier: 'FedEx', onTime: 78, delayed: 22 },
  { courier: 'DHL', onTime: 92, delayed: 8 },
];

export default function Logistics() {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Truck className="h-5 w-5" />
          Delivery Performance
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={deliveryData}>
              <XAxis dataKey="courier" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="onTime" fill="#4CAF50" name="On Time %" />
              <Bar dataKey="delayed" fill="#F44336" name="Delayed %" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}