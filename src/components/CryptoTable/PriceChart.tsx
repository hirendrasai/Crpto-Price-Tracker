import { LineChart, Line, ResponsiveContainer } from 'recharts';

interface PriceChartProps {
  data: { price: number; timestamp: number }[];
  color?: string;
}

const PriceChart = ({ data, color = "#22c55e" }: PriceChartProps) => {
  return (
    <ResponsiveContainer width="100%" height={32}>
      <LineChart data={data}>
        <Line
          type="monotone"
          dataKey="price"
          stroke={color}
          strokeWidth={1.5}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default PriceChart;