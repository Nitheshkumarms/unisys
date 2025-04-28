import { 
  Calendar, 
  RefreshCw, 
  LogOut, 
  User,
  Package,
  Truck,
  LineChart,
  Zap,
  LocateFixed,
  LayoutDashboard
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import { useNavigate, useLocation } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface DashboardHeaderProps {
  enabledFeatures: string[];
}

const featureIcons = {
  procurement: <Package className="h-4 w-4" />,
  warehouse: <Package className="h-4 w-4" />,
  logistics: <Truck className="h-4 w-4" />,
  order_trends: <LineChart className="h-4 w-4" />,
  inventory_distribution: <Package className="h-4 w-4" />,
  supplier_lead_times: <Truck className="h-4 w-4" />,
  shipment_tracking: <LocateFixed className="h-4 w-4" />,
  ai_insights: <Zap className="h-4 w-4" />,
  process_automation: <Zap className="h-4 w-4" />
};

const featureNames = {
  procurement: "Procurement",
  warehouse: "Warehouse",
  logistics: "Logistics",
  order_trends: "Order Trends",
  inventory_distribution: "Inventory",
  supplier_lead_times: "Supplier Lead",
  shipment_tracking: "Tracking",
  ai_insights: "AI Insights",
  process_automation: "Automation"
};

const DashboardHeader = ({ enabledFeatures }: DashboardHeaderProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const { user } = useAuth();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast({
        title: "Logged out successfully",
        description: "You have been signed out of your account",
      });
      navigate('/login');
    } catch (error) {
      toast({
        title: "Logout failed",
        description: error instanceof Error ? error.message : "An error occurred",
        variant: "destructive"
      });
    }
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  const getUserInitials = () => {
    if (!user?.displayName && !user?.email) return "US";
    const name = user.displayName || user.email?.split('@')[0];
    return name?.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
  };

  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4 border-b p-4 bg-white">
      <div className="flex items-center gap-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Supply Chain Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            {user?.email ? `Welcome back, ${user.displayName || user.email.split('@')[0]}` : 'Real-time overview'}
          </p>
        </div>

        <div className="hidden md:flex items-center gap-2 border-l pl-6">
          <Button 
            variant={location.pathname === '/dashboard' ? 'secondary' : 'ghost'} 
            size="sm"
            onClick={() => navigate('/dashboard')}
          >
            <LayoutDashboard className="h-4 w-4 mr-2" />
            Overview
          </Button>
          {enabledFeatures.map(featureId => (
            <Button
              key={featureId}
              variant={location.pathname.includes(`/features/${featureId}`) ? 'secondary' : 'ghost'}
              size="sm"
              onClick={() => navigate(`/features/${featureId.replace('_', '-')}`)}
              className="flex items-center gap-2"
            >
              {featureIcons[featureId as keyof typeof featureIcons]}
              {featureNames[featureId as keyof typeof featureNames]}
            </Button>
          ))}
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
        <div className="flex items-center gap-3">
          <Select defaultValue="today">
            <SelectTrigger className="w-full sm:w-[180px]">
              <Calendar className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Time Period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
            </SelectContent>
          </Select>

          <Button 
            variant="outline" 
            size="icon" 
            onClick={handleRefresh}
            title="Refresh data"
          >
            <RefreshCw className="h-4 w-4" />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={user?.photoURL || undefined} />
                  <AvatarFallback>{getUserInitials()}</AvatarFallback>
                </Avatar>
                <span className="hidden sm:inline">Account</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
                <User className="h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem 
                className="flex items-center gap-2 text-red-600 cursor-pointer"
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;