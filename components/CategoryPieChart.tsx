'use client';

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

type Transaction = {
  _id: string;
  amount: number;
  description: string;
  date: string;
  category: string;
};

const COLORS = ['#6366f1', '#ec4899', '#f59e0b', '#10b981', '#3b82f6', '#6b7280'];

export default function CategoryPieChart({
  transactions,
}: {
  transactions: Transaction[];
}) {
  // Group transactions by category
  const grouped = transactions.reduce((acc: any, tx) => {
    if (!acc[tx.category]) acc[tx.category] = 0;
    acc[tx.category] += tx.amount;
    return acc;
  }, {});

  const data = Object.entries(grouped).map(([category, value]) => ({
    name: category,
    value,
  }));

  return (
    <div className="w-full h-72">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            outerRadius={100}
            fill="#8884d8"
            label
          >
            {data.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
