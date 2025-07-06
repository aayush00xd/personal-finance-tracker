type Transaction = {
  _id: string;
  amount: number;
  description: string;
  date: string;
};

export default function TransactionList({
  transactions,
  onDelete,
}: {
  transactions: Transaction[];
  onDelete: () => void;
}) {
  const handleDelete = async (id: string) => {
    await fetch(`/api/transactions/${id}`, { method: 'DELETE' });
    onDelete();
  };

  return (
    <div className="mt-8 space-y-2 max-w-md">
      {transactions.map((tx) => (
        <div key={tx._id} className="border p-2 rounded shadow flex justify-between items-center">
          <div>
            <p className="font-medium">₹{tx.amount}</p>
            <p className="text-sm text-muted-foreground">{tx.description}</p>
            <p className="text-xs">{new Date(tx.date).toLocaleDateString()}</p>
          </div>
          <button
            className="text-red-600 hover:underline"
            onClick={() => handleDelete(tx._id)}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}
