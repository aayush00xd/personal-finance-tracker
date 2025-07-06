'use client';

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

export default function BudgetInsights({
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
      const txMonth = new Date(tx.date);
      const formattedTxMonth = `${txMonth.getFullYear()}-${String(txMonth.getMonth() + 1).padStart(2, '0')}`;
      return formattedTxMonth === currentMonth;
    })
    .reduce((acc: Record<string, number>, tx) => {
      acc[tx.category] = (acc[tx.category] || 0) + tx.amount;
      return acc;
    }, {});

  const relevantBudgets = budgets.filter((b) => b.month === currentMonth);

  if (relevantBudgets.length === 0) {
    return <p className="text-muted-foreground">No budgets set for this month.</p>;
  }

  return (
    <div className="space-y-2">
      {relevantBudgets.map((b) => {
        const spent = actuals[b.category] || 0;
        const difference = b.amount - spent;
        const over = difference < 0;

        return (
          <p key={`${b.category}-${b.month}`} className="text-sm">
            {spent === 0 ? (
              <span className="text-gray-500">
                ℹ️ No spending recorded in <b>{b.category}</b> yet.
              </span>
            ) : (
              <span className={over ? 'text-red-600' : 'text-green-600'}>
                {over ? '⚠️ Over budget' : '✅ Within budget'} in <b>{b.category}</b> by ₹{Math.abs(difference)}
              </span>
            )}
          </p>
        );
      })}
    </div>
  );
}
