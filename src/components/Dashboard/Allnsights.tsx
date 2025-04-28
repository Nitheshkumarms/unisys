
import { Brain, TrendingUp, BarChart2, AlertCircle, ChevronDown } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface InsightData {
  id: string;
  type: "prediction" | "optimization" | "alert";
  title: string;
  description: string;
  impact: string;
  recommendation: string;
}

const insights: InsightData[] = [
  {
    id: "ins-001",
    type: "prediction",
    title: "Seasonal Demand Forecast",
    description: "Based on historical data and market trends, our AI predicts a 32% increase in demand for product category A over the next 3 months.",
    impact: "Potential revenue increase of $1.2M if inventory levels are optimized to meet demand.",
    recommendation: "Increase procurement of key items in category A by 25% within the next 2 weeks."
  },
  {
    id: "ins-002",
    type: "optimization",
    title: "Warehouse Space Utilization",
    description: "Current warehouse layout is operating at 68% efficiency. AI analysis suggests reorganization of high-velocity SKUs.",
    impact: "Potential 15% reduction in picking time and 20% increase in storage capacity.",
    recommendation: "Implement the suggested zone reorganization during the upcoming maintenance window."
  },
  {
    id: "ins-003",
    type: "alert",
    title: "Supply Chain Disruption Risk",
    description: "Detected potential disruption with supplier XYZ due to regional weather events affecting their production facilities.",
    impact: "May affect 15% of your product line within 3 weeks if not addressed.",
    recommendation: "Activate backup supplier plan for affected components and adjust lead times in planning system."
  }
];

const getInsightIcon = (type: InsightData["type"]) => {
  switch (type) {
    case "prediction":
      return <TrendingUp className="h-5 w-5 text-uiscm-blue-500" />;
    case "optimization":
      return <BarChart2 className="h-5 w-5 text-uiscm-teal-500" />;
    case "alert":
      return <AlertCircle className="h-5 w-5 text-uiscm-warning" />;
    default:
      return <Brain className="h-5 w-5 text-uiscm-blue-500" />;
  }
};

const getInsightClass = (type: InsightData["type"]) => {
  switch (type) {
    case "prediction":
      return "border-l-4 border-uiscm-blue-500";
    case "optimization":
      return "border-l-4 border-uiscm-teal-500";
    case "alert":
      return "border-l-4 border-uiscm-warning";
    default:
      return "";
  }
};

const AIInsights = () => {
  return (
    <Card className="mb-6">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Brain className="mr-2 h-6 w-6 text-primary" />
            <div>
              <CardTitle>AI-Powered Insights</CardTitle>
              <CardDescription>
                Intelligent recommendations based on your supply chain data
              </CardDescription>
            </div>
          </div>
          <Button size="sm" variant="outline" className="gap-1">
            <span>All Insights</span>
            <ChevronDown className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          {insights.map((insight) => (
            <AccordionItem 
              key={insight.id} 
              value={insight.id} 
              className={`mb-4 p-4 rounded-lg shadow-sm ${getInsightClass(insight.type)}`}
            >
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center text-left">
                  {getInsightIcon(insight.type)}
                  <div className="ml-2">
                    <h4 className="text-base font-semibold">{insight.title}</h4>
                    <p className="text-sm text-muted-foreground">{insight.description.substring(0, 60)}...</p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-4 pb-2">
                <div className="grid gap-4 text-sm">
                  <p><strong>Description:</strong> {insight.description}</p>
                  <p><strong>Business Impact:</strong> {insight.impact}</p>
                  <p><strong>AI Recommendation:</strong> {insight.recommendation}</p>
                  <div className="flex justify-end gap-2 pt-2">
                    <Button size="sm" variant="outline">Dismiss</Button>
                    <Button size="sm" variant="default">Apply Recommendation</Button>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
};

export default AIInsights;
