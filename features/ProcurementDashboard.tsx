// src/components/features/ProcurementDashboard.tsx
interface ProcurementDashboardProps {
    expandedView?: boolean;
  }
  
  export default function ProcurementDashboard({ 
    expandedView = false 
  }: ProcurementDashboardProps) {
    // Shared logic between dashboard card and full page
    
    return (
      <div className={expandedView ? 'space-y-6' : 'space-y-2'}>
        {expandedView && (
          <div className="grid grid-cols-3 gap-4">
            {/* Expanded view content */}
          </div>
        )}
        {!expandedView && (
          <div className="space-y-2">
            {/* Compact dashboard view */}
          </div>
        )}
      </div>
    );
  }