'use client';

import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

export default function TransactionForm({ onAdd }: { onAdd: () => void }) {
  const { register, handleSubmit, reset } = useForm();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: any) => {
    setLoading(true);

    // Ensure the date is in ISO format (YYYY-MM-DD)
    const formattedDate = new Date(data.date).toISOString();

    await fetch('/api/transactions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        amount: Number(data.amount),
        description: data.description,
        category: data.category,
        date: formattedDate,
      }),
    });

    reset();
    setLoading(false);
    onAdd();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-md">
      <Input type="text" placeholder="Description" {...register('description', { required: true })} />
      <Input type="number" placeholder="Amount" {...register('amount', { required: true })} />
      <select {...register('category', { required: true })} className="w-full border rounded p-2">
        <option value="">Select Category</option>
        <option value="Food">Food</option>
        <option value="Transport">Transport</option>
        <option value="Rent">Rent</option>
        <option value="Entertainment">Entertainment</option>
        <option value="Utilities">Utilities</option>
        <option value="Other">Other</option>
      </select>
      <Input type="date" {...register('date', { required: true })} />
      <Button type="submit" disabled={loading}>
        {loading ? 'Adding...' : 'Add Transaction'}
      </Button>
    </form>
  );
}
