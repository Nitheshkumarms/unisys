
import { Bell, HelpCircle, Menu, Search, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { useState } from "react";

interface NavbarProps {
  toggleSidebar?: () => void;
}

const Navbar = ({ toggleSidebar }: NavbarProps) => {
  const [notifications] = useState(3);

  return (
    <div className="flex h-16 items-center px-4 border-b bg-white">
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={toggleSidebar}
        className="mr-2 md:hidden"
      >
        <Menu className="h-5 w-5" />
      </Button>
      
      <div className="font-bold text-uiscm-blue-600 text-lg mr-6">UISCM</div>
      
      <div className="flex-1 flex items-center">
        <div className="relative max-w-md w-full mr-4 hidden md:flex">
          <Input
            placeholder="Search..."
            className="pl-10 h-9"
          />
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
        </div>
        
        <nav className="hidden md:flex space-x-4">
          <Button variant="ghost">Dashboard</Button>
          <Button variant="ghost">Procurement</Button>
          <Button variant="ghost">Warehouse</Button>
          <Button variant="ghost">Logistics</Button>
        </nav>
      </div>
      
      <div className="flex items-center space-x-2">
        <Button variant="ghost" size="icon">
          <HelpCircle className="h-5 w-5" />
        </Button>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              {notifications > 0 && (
                <span className="absolute top-1 right-1 h-4 w-4 rounded-full bg-uiscm-error flex items-center justify-center text-[10px] text-white">
                  {notifications}
                </span>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-72">
            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="py-2">
              <div className="flex flex-col space-y-1">
                <span className="font-medium">Inventory Alert</span>
                <span className="text-xs text-muted-foreground">SKU-7890 below reorder threshold</span>
                <span className="text-xs text-muted-foreground">10 minutes ago</span>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem className="py-2">
              <div className="flex flex-col space-y-1">
                <span className="font-medium">Shipment Delayed</span>
                <span className="text-xs text-muted-foreground">Order #45678 delayed at transit point</span>
                <span className="text-xs text-muted-foreground">1 hour ago</span>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem className="py-2">
              <div className="flex flex-col space-y-1">
                <span className="font-medium">AI Insight Available</span>
                <span className="text-xs text-muted-foreground">New predictive analysis ready</span>
                <span className="text-xs text-muted-foreground">3 hours ago</span>
              </div>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="justify-center text-sm">
              View all notifications
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              <User className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Support</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Log out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default Navbar;
