import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/components/ui/use-toast";

const availableFeatures = [
  { id: "procurement", label: "Procurement", icon: "📦" },
  { id: "warehouse", label: "Warehouse", icon: "🏭" },
  { id: "logistics", label: "Logistics", icon: "🚚" },
  { id: "order_trends", label: "Order Trends", icon: "📊" },
  { id: "inventory_distribution", label: "Inventory Distribution", icon: "📦" },
  { id: "supplier_lead_times", label: "Supplier Lead Times", icon: "⏱️" },
  { id: "shipment_tracking", label: "Real-time Shipment Tracking", icon: "📍" },
  { id: "ai_insights", label: "AI-Powered Insights", icon: "🤖" },
  { id: "process_automation", label: "Process Automation", icon: "⚡" },
];

export default function FeatureSelection() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);

  const toggleFeature = (featureId: string) => {
    setSelectedFeatures((prev) =>
      prev.includes(featureId)
        ? prev.filter((id) => id !== featureId)
        : [...prev, featureId]
    );
  };

  const handleSubmit = () => {
    if (selectedFeatures.length === 0) {
      toast({
        title: "No features selected",
        description: "Please select at least one feature to continue",
        variant: "destructive"
      });
      return;
    }
    localStorage.setItem("selectedFeatures", JSON.stringify(selectedFeatures));
    toast({
      title: "Preferences saved",
      description: "Your dashboard has been configured",
    });
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>Select Your Features</CardTitle>
          <p className="text-muted-foreground mt-2">
            Choose which modules you want to enable in your dashboard.
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
            {availableFeatures.map((feature) => (
              <div key={feature.id} className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50">
                <Checkbox
                  id={feature.id}
                  checked={selectedFeatures.includes(feature.id)}
                  onCheckedChange={() => toggleFeature(feature.id)}
                />
                <label htmlFor={feature.id} className="text-sm font-medium flex items-center gap-2">
                  <span className="text-lg">{feature.icon}</span>
                  {feature.label}
                </label>
              </div>
            ))}
          </div>
          <Button 
            onClick={handleSubmit}
            disabled={selectedFeatures.length === 0}
            className="w-full"
          >
            Continue to Dashboard
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}