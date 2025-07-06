'use client';

import { useEffect, useState } from 'react';
import TransactionForm from '@/components/TransactionForm';
import TransactionList from '@/components/TransactionList';
import TransactionChart from '@/components/TransactionChart';
import CategoryPieChart from '@/components/CategoryPieChart';
import BudgetForm from '@/components/BudgetForm';
import BudgetComparisonChart from '@/components/BudgetComparisonChart';
import BudgetInsights from '@/components/BudgetInsights'; // ✅ added import

type Transaction = {
  _id: string;
  amount: number;
  description: string;
  date: string;
  category: string;
};

type Budget = {
  category: string;
  amount: number;
  month: string;
};

export default function Home() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [budgets, setBudgets] = useState<Budget[]>([]);

  const fetchData = async () => {
    const res = await fetch('/api/transactions');
    const data = await res.json();
    setTransactions(data);
  };

  const fetchBudgets = async () => {
  try {
    const res = await fetch('/api/budgets');

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Fetch failed: ${res.status} - ${text}`);
    }

    const data = await res.json();
    console.log('✅ Budgets fetched:', data);

    setBudgets(data);
  } catch (error) {
    console.error('❌ Error fetching budgets:', error);
  }
};

  useEffect(() => {
    fetchData();
    fetchBudgets();
  }, []);

  return (
    <main className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">💰 Personal Finance Tracker</h1>

      {/* Transaction Form */}
      <TransactionForm onAdd={fetchData} />

      {/* Monthly Expenses Chart */}
      <div>
        <h2 className="text-lg font-semibold mt-8 mb-2">Monthly Expenses</h2>
        <TransactionChart transactions={transactions} />
      </div>

      {/* Category Pie Chart */}
      <div>
        <h2 className="text-lg font-semibold mt-8 mb-2">Category Breakdown</h2>
        <CategoryPieChart transactions={transactions} />
      </div>

      {/* Budget Form */}
      <div>
        <h2 className="text-lg font-semibold mt-8 mb-2">Set Monthly Budgets</h2>
        <BudgetForm onSave={fetchBudgets} />
      </div>

      {/* Budget vs Actual Chart */}
      <div>
        <h2 className="text-lg font-semibold mt-8 mb-2">Budget vs Actual</h2>
        <BudgetComparisonChart transactions={transactions} budgets={budgets} />
      </div>

      {/* 💡 Budget Insights */}
      <div>
        <h2 className="text-lg font-semibold mt-8 mb-2">Spending Insights</h2>
        <BudgetInsights transactions={transactions} budgets={budgets} />
      </div>

      {/* Transaction List */}
      <TransactionList transactions={transactions} onDelete={fetchData} />
    </main>
  );
}
