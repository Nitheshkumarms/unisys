import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ReactNode } from "react";

interface DashboardCardProps {
  title: string;
  icon: ReactNode;
  children: ReactNode;
  className?: string;
  action?: React.ReactNode;
}

export function DashboardCard({ 
  title, 
  icon, 
  children, 
  className = "" 
}: DashboardCardProps) {
  return (
    <Card className={`h-full flex flex-col ${className}`}>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-lg">
          {icon}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 p-4">
        {children}
      </CardContent>
    </Card>
  );
}