// src/components/features/DashboardSidebar.tsx
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

const features = [
  { id: 'procurement', name: 'Procurement', path: '/features/procurement' },
  { id: 'warehouse', name: 'Warehouse', path: '/features/warehouse' },
  // ... other features
];

export default function DashboardSidebar() {
  const location = useLocation();

  return (
    <div className="w-64 border-r p-4">
      <h3 className="font-bold mb-4">Supply Chain Features</h3>
      <nav className="space-y-1">
        {features.map((feature) => (
          <Link
            key={feature.id}
            to={feature.path}
            className={cn(
              'block px-3 py-2 rounded-md',
              location.pathname === feature.path
                ? 'bg-accent text-accent-foreground'
                : 'hover:bg-muted'
            )}
          >
            {feature.name}
          </Link>
        ))}
      </nav>
    </div>
  );
}