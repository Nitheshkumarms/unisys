import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import DashboardHeader from '@/components/Dashboard/DashboardHeader';
import { Button } from '@/components/ui/button';

export default function Index() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [enabledFeatures, setEnabledFeatures] = useState<string[]>([]);

  useEffect(() => {
    if (user) {
      const featuresJson = localStorage.getItem('selectedFeatures') || '[]';
      const features = JSON.parse(featuresJson) as string[];
      setEnabledFeatures(features);
      
      // Redirect to feature selection if no features are selected
      if (features.length === 0) {
        navigate('/select-features');
      }
    }
  }, [user, navigate]);

  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <DashboardHeader enabledFeatures={enabledFeatures} />
      
      <main className="flex-1 p-6">
        <div className="flex flex-col items-center justify-center h-full gap-4">
          <h2 className="text-2xl font-bold">Welcome to Supply Chain Vision AI</h2>
          <p className="text-muted-foreground">
            Select features from the menu to get started
          </p>
          <Button onClick={() => navigate('/select-features')}>
            Manage Features
          </Button>
        </div>
      </main>
    </div>
  );
}