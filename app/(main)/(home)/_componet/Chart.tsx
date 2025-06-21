import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { Card } from "@/components/ui/card";

const chartData = [
  { name: "January", price: 3500 },
  { name: "February", price: 4200 },
  { name: "March", price: 2800 },
  { name: "April", price: 5100 },
  { name: "May", price: 3900 },
];

export const Chart = () => {
  return (
    <Card className="mt-2 h-full w-full">
      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <XAxis
            dataKey="name"
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `$${value.toLocaleString()}`}
          />
          <Tooltip formatter={(value: number) => `$${value.toLocaleString()}`} />
          <Bar
            dataKey="price"
            fill="#0369a1"
            radius={[4, 4, 0, 0]}
            name="Earned Money"
          />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};
