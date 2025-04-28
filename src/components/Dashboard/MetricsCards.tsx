
import { 
  ArrowDownRight, 
  ArrowUpRight, 
  Package, 
  ShoppingCart, 
  Truck, 
  Warehouse 
} from "lucide-react";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  title: string;
  value: string;
  change: {
    value: string;
    trend: "up" | "down" | "neutral";
  };
  icon: React.ReactNode;
  bgColor?: string;
}

const MetricCard = ({ title, value, change, icon, bgColor = "bg-white" }: MetricCardProps) => {
  return (
    <div className={cn("uiscm-card flex flex-col", bgColor)}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <h3 className="text-2xl font-bold mt-1">{value}</h3>
        </div>
        <div className="rounded-full p-2 bg-primary/10 text-primary">
          {icon}
        </div>
      </div>
      
      <div className="flex items-center mt-4 text-sm">
        {change.trend === "up" ? (
          <ArrowUpRight className="h-4 w-4 mr-1 text-uiscm-success" />
        ) : change.trend === "down" ? (
          <ArrowDownRight className="h-4 w-4 mr-1 text-uiscm-error" />
        ) : null}
        
        <span 
          className={cn(
            change.trend === "up" && "text-uiscm-success", 
            change.trend === "down" && "text-uiscm-error",
            change.trend === "neutral" && "text-muted-foreground"
          )}
        >
          {change.value}
        </span>
        <span className="text-muted-foreground ml-1">vs last period</span>
      </div>
    </div>
  );
};

const MetricsCards = () => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
      <MetricCard
        title="Active Orders"
        value="1,284"
        change={{ value: "12.3%", trend: "up" }}
        icon={<ShoppingCart className="h-4 w-4" />}
      />
      <MetricCard
        title="Inventory Items"
        value="32,594"
        change={{ value: "3.2%", trend: "up" }}
        icon={<Package className="h-4 w-4" />}
      />
      <MetricCard
        title="Warehouse Capacity"
        value="78%"
        change={{ value: "2.1%", trend: "down" }}
        icon={<Warehouse className="h-4 w-4" />}
      />
      <MetricCard
        title="Deliveries in Transit"
        value="327"
        change={{ value: "5.7%", trend: "up" }}
        icon={<Truck className="h-4 w-4" />}
      />
    </div>
  );
};

export default MetricsCards;
