import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export default function RealtimeTrackingPage() {
  const navigate = useNavigate();

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Real-time Tracking</h1>
        <Button onClick={() => navigate('/dashboard')} variant="outline">
          Back to Dashboard
        </Button>
      </div>
      {/* Add your tracking content here */}
    </div>
  );
}