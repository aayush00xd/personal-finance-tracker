'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

type Transaction = {
  amount: number;
  category: string;
  date: string;
};

type Budget = {
  category: string;
  amount: number;
  month: string;
};

export default function BudgetComparisonChart({
  transactions,
  budgets,
}: {
  transactions: Transaction[];
  budgets: Budget[];
}) {
  const now = new Date();
  const currentMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;

  const actuals = transactions
    .filter((tx) => {
      const txDate = new Date(tx.date);
      const txMonth = `${txDate.getFullYear()}-${String(txDate.getMonth() + 1).padStart(2, '0')}`;
      return txMonth === currentMonth;
    })
    .reduce((acc: Record<string, number>, tx) => {
      acc[tx.category] = (acc[tx.category] || 0) + tx.amount;
      return acc;
    }, {});

  const data = budgets
    .filter((b) => b.month === currentMonth)
    .map((b) => ({
      category: b.category,
      budget: b.amount,
      actual: actuals[b.category] || 0,
    }));
 console.log("Chart Data:", data);
  return (
    <div className="h-80 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis dataKey="category" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="budget" fill="#4f46e5" name="Budget" />
          <Bar dataKey="actual" fill="#f97316" name="Actual" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
