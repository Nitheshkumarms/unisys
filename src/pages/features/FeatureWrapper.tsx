// src/components/features/FeatureWrapper.tsx
import { Outlet } from 'react-router-dom';
import DashboardSidebar from './DashboardSidebar';

export default function FeatureWrapper() {
  return (
    <div className="flex h-screen">
      <DashboardSidebar />
      <div className="flex-1 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
}