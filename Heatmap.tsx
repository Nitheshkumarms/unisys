import { useMemo } from 'react';
import { Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface WarehouseData {
  section: string;
  capacity: number;
  utilization: number;
}

export function Heatmap({ data }: { data: WarehouseData[] }) {
  const chartData = useMemo(() => (
    data.map(item => ({
      name: item.section,
      utilization: item.utilization,
      capacity: item.capacity
    }))
  ), [data]);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={chartData} layout="vertical">
        <XAxis type="number" domain={[0, 100]} />
        <YAxis dataKey="name" type="category" width={80} />
        <Tooltip formatter={(value) => [`${value}%`, 'Utilization']} />
        <Bar dataKey="utilization" fill="#8884d8" radius={[0, 4, 4, 0]}>
          {chartData.map((entry, index) => (
            <Cell 
              key={`cell-${index}`} 
              fill={entry.utilization > 80 ? '#ff4d4f' : entry.utilization > 50 ? '#faad14' : '#52c41a'}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}