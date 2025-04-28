import { Package, ArrowUpRight } from "lucide-react";
import { DashboardCard } from "./src/components/Dashboard/DashboardCard";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const procurementData = [
  { month: 'Jan', spend: 125000 },
  { month: 'Feb', spend: 142000 },
  { month: 'Mar', spend: 136000 },
  { month: 'Apr', spend: 155000 },
];

export default function Procurement() {
  const navigate = useNavigate();

  return (
    <DashboardCard 
      title="Procurement Analytics" 
      icon={<Package className="h-5 w-5" />}
      action={
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-muted-foreground hover:text-primary"
          onClick={() => navigate('/features/procurement')}
        >
          <ArrowUpRight className="h-4 w-4" />
        </Button>
      }
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