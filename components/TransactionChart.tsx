'use client';

import { Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis, ResponsiveContainer } from 'recharts';

type Transaction = {
  _id: string;
  amount: number;
  description: string;
  date: string;
};

export default function TransactionChart({ transactions }: { transactions: Transaction[] }) {
  // Group & sum transactions by month
  const monthlyData = transactions.reduce((acc: any, tx) => {
    const month = new Date(tx.date).toLocaleString('default', { month: 'short', year: 'numeric' });

    if (!acc[month]) acc[month] = 0;
    acc[month] += tx.amount;
    return acc;
  }, {});

  const chartData = Object.entries(monthlyData).map(([month, total]) => ({
    month,
    total,
  }));

  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <CartesianGrid stroke="#ccc" />
          <Bar dataKey="total" fill="#4f46e5" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
