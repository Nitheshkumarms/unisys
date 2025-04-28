import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import DashboardHeader from '@/components/Dashboard/DashboardHeader';

// Import all feature components
import Procurement from '@/components/Dashboard/Procurement';
import Warehouse from '@/components/Dashboard/Warehouse';
import Logistics from '@/components/Dashboard/Logistics';
import OrderTrends from '@/components/Dashboard/OrderTrends';
import InventoryDistribution from '@/components/Dashboard/InventoryDistribution';
import SupplierLeadTimes from '@/components/Dashboard/SupplierLeadTimes';
import AllInsights from '@/components/Dashboard/Allnsights';
import ProcessAutomation from '@/components/Dashboard/ProcessAutomation';

const featureComponents = {
  procurement: { component: Procurement, cols: 1 },
  warehouse: { component: Warehouse, cols: 1 },
  logistics: { component: Logistics, cols: 2 }, // Wider component
  order_trends: { component: OrderTrends, cols: 1 },
  inventory_distribution: { component: InventoryDistribution, cols: 1 },
  supplier_lead_times: { component: SupplierLeadTimes, cols: 1 },
  ai_insights: { component: AllInsights, cols: 2 }, // Wider component
  process_automation: { component: ProcessAutomation, cols: 1 },
};

export default function Dashboard() {
  const navigate = useNavigate();
  const [enabledFeatures, setEnabledFeatures] = useState<string[]>([]);

  useEffect(() => {
    const featuresJson = localStorage.getItem('selectedFeatures');
    if (!featuresJson) {
      navigate('/select-features');
      return;
    }
    const features = JSON.parse(featuresJson);
    setEnabledFeatures(features || []);
  }, [navigate]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <DashboardHeader enabledFeatures={enabledFeatures} />
      
      <main className="flex-1 p-4">
        {/* Fluid grid container */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 auto-rows-min">
          {enabledFeatures.map(featureId => {
            const { component: FeatureComponent, cols } = featureComponents[featureId as keyof typeof featureComponents] || {};
            
            return FeatureComponent ? (
              <div 
                key={featureId}
                className={`
                  bg-white rounded-xl shadow-sm border
                  ${cols === 2 ? 'sm:col-span-2' : ''}
                  ${cols === 3 ? 'lg:col-span-3' : ''}
                  h-full min-h-[300px] overflow-hidden
                `}
              >
                <FeatureComponent />
              </div>
            ) : null;
          })}
        </div>

        {enabledFeatures.length === 0 && (
          <div className="flex items-center justify-center h-[60vh]">
            <div className="text-center p-8 bg-white rounded-xl shadow-sm border">
              <p className="text-gray-500 mb-6">You haven't selected any features yet</p>
              <Button 
                onClick={() => navigate('/select-features')}
                className="px-6 py-3"
              >
                Choose Dashboard Features
              </Button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}