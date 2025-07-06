'use client';

import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

const categories = ['Food', 'Transport', 'Rent', 'Entertainment', 'Utilities', 'Other'];

export default function BudgetForm({ onSave }: { onSave: () => void }) {
  const { register, handleSubmit, reset } = useForm();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: any) => {
    setLoading(true);

    const now = new Date();
    const formattedMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;

    await fetch('/api/budgets', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        category: data.category,
        amount: Number(data.amount),
        month: formattedMonth,
      }),
    });

    reset();
    setLoading(false);
    onSave();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-md">
      <select {...register('category', { required: true })} className="w-full border rounded p-2">
        {categories.map((cat) => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>
      <Input type="number" placeholder="Monthly Budget" {...register('amount', { required: true })} />
      <Button type="submit" disabled={loading}>
        {loading ? 'Saving...' : 'Set Budget'}
      </Button>
    </form>
  );
}
