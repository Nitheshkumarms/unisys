// src/pages/features/LogisticsPage.tsx
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import LogisticsDashboard from '@/components/features/LogisticsDashboard';

export default function LogisticsPage() {
  const navigate = useNavigate();

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Logistics Analytics</h1>
        <Button onClick={() => navigate('/dashboard')} variant="outline">
          Back to Dashboard
        </Button>
      </div>
      <LogisticsDashboard expandedView={true} />
    </div>
  );
}