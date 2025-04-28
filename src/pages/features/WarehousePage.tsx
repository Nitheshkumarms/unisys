// WarehousePage.tsx
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import WarehouseDashboard from '@/components/features/WarehouseDashboard';

export default function WarehousePage() {
  const navigate = useNavigate();

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Warehouse Analytics</h1>
        <Button onClick={() => navigate('/dashboard')} variant="outline">
          Back to Dashboard
        </Button>
      </div>
      <WarehouseDashboard expandedView={true} />
    </div>
  );
}