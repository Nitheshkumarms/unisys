import { Package } from "lucide-react";
import { DashboardCard } from "./DashboardCard";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const procurementData = [
  { month: 'Jan', spend: 125000 },
  { month: 'Feb', spend: 142000 },
  { month: 'Mar', spend: 136000 },
  { month: 'Apr', spend: 155000 },
];

export default function Procurement() {
  return (
    <DashboardCard 
      title="Procurement Analytics" 
      icon={<Package className="h-5 w-5" />}
    >
      <div className="h-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={procurementData}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Spend']} />
            <Bar dataKey="spend" fill="#8884d8" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </DashboardCard>
  );
}