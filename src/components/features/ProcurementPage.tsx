import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import ProcurementDashboard from '@/components/features/ProcurementDashboard';

export default function ProcurementPage() {
  const navigate = useNavigate();

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Procurement Analytics</h1>
        <Button 
          onClick={() => navigate('/dashboard')}
          variant="outline"
        >
          Back to Dashboard
        </Button>
      </div>
      <ProcurementDashboard expandedView={true} />
    </div>
  );
}