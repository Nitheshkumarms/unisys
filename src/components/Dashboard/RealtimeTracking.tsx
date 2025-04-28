
import { StatusBadge } from "@/components/common/StatusBadge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Truck, Package, LocateFixed } from "lucide-react";

interface ShipmentData {
  id: string;
  customer: string;
  origin: string;
  destination: string;
  status: "in_transit" | "delayed" | "delivered" | "processing";
  eta: string;
  lastUpdated: string;
}

const shipments: ShipmentData[] = [
  {
    id: "SHP-2023-0574",
    customer: "Acme Corporation",
    origin: "Chicago, IL",
    destination: "New York, NY",
    status: "in_transit",
    eta: "Apr 15, 2025",
    lastUpdated: "10 minutes ago"
  },
  {
    id: "SHP-2023-0573",
    customer: "TechNova Inc.",
    origin: "Austin, TX",
    destination: "San Francisco, CA",
    status: "delayed",
    eta: "Apr 17, 2025",
    lastUpdated: "1 hour ago"
  },
  {
    id: "SHP-2023-0572",
    customer: "Global Supplies Ltd.",
    origin: "Miami, FL",
    destination: "Boston, MA",
    status: "in_transit",
    eta: "Apr 14, 2025",
    lastUpdated: "30 minutes ago"
  },
  {
    id: "SHP-2023-0571",
    customer: "Innovate Solutions",
    origin: "Seattle, WA",
    destination: "Denver, CO",
    status: "processing",
    eta: "Apr 19, 2025",
    lastUpdated: "5 hours ago"
  },
  {
    id: "SHP-2023-0570",
    customer: "Prime Industries",
    origin: "Atlanta, GA",
    destination: "Dallas, TX",
    status: "delivered",
    eta: "Apr 12, 2025",
    lastUpdated: "2 days ago"
  }
];

const getStatusBadge = (status: ShipmentData["status"]) => {
  switch (status) {
    case "in_transit":
      return <StatusBadge status="info" text="In Transit" pulsing={true} />;
    case "delayed":
      return <StatusBadge status="warning" text="Delayed" />;
    case "delivered":
      return <StatusBadge status="success" text="Delivered" />;
    case "processing":
      return <StatusBadge status="neutral" text="Processing" />;
    default:
      return <StatusBadge status="neutral" text="Unknown" />;
  }
};

const RealtimeTracking = () => {
  return (
    <Card className="mb-6">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="flex items-center">
            <LocateFixed className="mr-2 h-5 w-5 text-primary" />
            Real-time Shipment Tracking
          </CardTitle>
          <CardDescription>
            Live updates on current shipments and deliveries
          </CardDescription>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <div className="flex items-center">
            <span className="inline-block h-2 w-2 rounded-full bg-uiscm-success mr-1"></span>
            <span>Live</span>
          </div>
          <div>Last updated: Just now</div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tracking ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead className="hidden md:table-cell">Origin</TableHead>
                <TableHead className="hidden md:table-cell">Destination</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="hidden md:table-cell">ETA</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {shipments.map((shipment) => (
                <TableRow key={shipment.id} className="hover:bg-muted/50">
                  <TableCell className="font-medium">{shipment.id}</TableCell>
                  <TableCell>{shipment.customer}</TableCell>
                  <TableCell className="hidden md:table-cell">{shipment.origin}</TableCell>
                  <TableCell className="hidden md:table-cell">{shipment.destination}</TableCell>
                  <TableCell>{getStatusBadge(shipment.status)}</TableCell>
                  <TableCell className="hidden md:table-cell">{shipment.eta}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <button
                        className="size-8 rounded-full flex items-center justify-center text-uiscm-blue-500 hover:bg-uiscm-blue-50"
                        title="Track Details"
                      >
                        <LocateFixed className="h-4 w-4" />
                      </button>
                      <button
                        className="size-8 rounded-full flex items-center justify-center text-uiscm-blue-500 hover:bg-uiscm-blue-50"
                        title="Package Details"
                      >
                        <Package className="h-4 w-4" />
                      </button>
                      <button
                        className="size-8 rounded-full flex items-center justify-center text-uiscm-blue-500 hover:bg-uiscm-blue-50"
                        title="Vehicle Details"
                      >
                        <Truck className="h-4 w-4" />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default RealtimeTracking;
