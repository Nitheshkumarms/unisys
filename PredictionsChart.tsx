import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface PredictionData {
  date: string;
  predictedDemand: number;
  actualDemand?: number;
}

export function PredictionsChart({ data }: { data: PredictionData[] }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data}>
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Line 
          type="monotone" 
          dataKey="predictedDemand" 
          stroke="#8884d8" 
          strokeWidth={2}
          dot={false}
        />
        {data.some(d => d.actualDemand) && (
          <Line 
            type="monotone" 
            dataKey="actualDemand" 
            stroke="#82ca9d" 
            strokeWidth={2}
            dot={false}
          />
        )}
      </LineChart>
    </ResponsiveContainer>
  );
}