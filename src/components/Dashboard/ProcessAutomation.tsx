
import { 
  Cog, 
  LineChart, 
  Zap,
  CheckCircle,
  Truck,
  PackageOpen,
  RefreshCw,
  ArrowRight,
  RotateCw
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { StatusBadge } from "@/components/common/StatusBadge";

interface AutomationProcess {
  id: string;
  name: string;
  icon: React.ReactNode;
  status: "active" | "paused" | "error" | "scheduled";
  progress: number;
  lastRun: string;
  nextRun: string;
  metrics: {
    timesSaved: string;
    errorRate: string;
  };
}

const processes: AutomationProcess[] = [
  {
    id: "proc-001",
    name: "Order Processing",
    icon: <CheckCircle className="h-5 w-5" />,
    status: "active",
    progress: 100,
    lastRun: "1 hour ago",
    nextRun: "In 30 minutes",
    metrics: {
      timesSaved: "45 hours/month",
      errorRate: "0.05%"
    }
  },
  {
    id: "proc-002",
    name: "Inventory Replenishment",
    icon: <PackageOpen className="h-5 w-5" />,
    status: "active",
    progress: 100,
    lastRun: "2 hours ago",
    nextRun: "In 3 hours",
    metrics: {
      timesSaved: "120 hours/month",
      errorRate: "0.8%"
    }
  },
  {
    id: "proc-003",
    name: "Logistics Optimization",
    icon: <Truck className="h-5 w-5" />,
    status: "paused",
    progress: 0,
    lastRun: "Yesterday",
    nextRun: "Manually trigger",
    metrics: {
      timesSaved: "60 hours/month",
      errorRate: "1.2%"
    }
  },
  {
    id: "proc-004",
    name: "Demand Forecasting",
    icon: <LineChart className="h-5 w-5" />,
    status: "scheduled",
    progress: 0,
    lastRun: "Yesterday",
    nextRun: "Tomorrow 8:00 AM",
    metrics: {
      timesSaved: "80 hours/month",
      errorRate: "2.1%"
    }
  }
];

const getStatusBadge = (status: AutomationProcess["status"]) => {
  switch (status) {
    case "active":
      return <StatusBadge status="success" text="Active" pulsing={true} />;
    case "paused":
      return <StatusBadge status="warning" text="Paused" />;
    case "error":
      return <StatusBadge status="error" text="Error" />;
    case "scheduled":
      return <StatusBadge status="info" text="Scheduled" />;
    default:
      return <StatusBadge status="neutral" text="Unknown" />;
  }
};

const ProcessAutomation = () => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Zap className="mr-2 h-6 w-6 text-primary" />
            <div>
              <CardTitle>Process Automation</CardTitle>
              <CardDescription>
                Automated workflows reducing manual intervention
              </CardDescription>
            </div>
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <RefreshCw className="mr-1 h-4 w-4" />
            <span>Auto-updating</span>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="grid gap-4">
          {processes.map((process) => (
            <div 
              key={process.id}
              className="flex flex-col p-4 rounded-lg border bg-card text-card-foreground hover:shadow-sm transition-shadow"
            >
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center">
                  <div className="mr-3 p-2 rounded-full bg-primary/10 text-primary">
                    {process.icon}
                  </div>
                  <div>
                    <h3 className="font-medium text-base">{process.name}</h3>
                    <div className="flex items-center mt-1">
                      {getStatusBadge(process.status)}
                      
                      {process.status === "active" && (
                        <div className="ml-3 flex items-center">
                          <Progress value={process.progress} className="h-2 w-16 mr-2" />
                          <span className="text-xs text-muted-foreground">
                            {process.progress}%
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                <button className="flex items-center text-xs text-muted-foreground hover:text-foreground transition-colors">
                  <Cog className="h-4 w-4 mr-1" />
                  <span>Configure</span>
                </button>
              </div>
              
              <div className="flex flex-wrap gap-x-6 gap-y-2 mt-2 text-sm">
                <div className="flex items-center">
                  <RotateCw className="mr-1 h-4 w-4 text-muted-foreground" />
                  <span>Last run: <span className="text-muted-foreground">{process.lastRun}</span></span>
                </div>
                <div className="flex items-center">
                  <ArrowRight className="mr-1 h-4 w-4 text-muted-foreground" />
                  <span>Next run: <span className="text-muted-foreground">{process.nextRun}</span></span>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-x-6 gap-y-2 mt-3 text-sm">
                <div className="flex items-center">
                  <span className="text-uiscm-success font-medium mr-1">↗</span>
                  <span>Time saved: <span className="font-medium">{process.metrics.timesSaved}</span></span>
                </div>
                <div className="flex items-center">
                  <span className="text-uiscm-error font-medium mr-1">↘</span>
                  <span>Error rate: <span className="font-medium">{process.metrics.errorRate}</span></span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProcessAutomation;
