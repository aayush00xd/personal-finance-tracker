import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Transaction from '@/models/Transaction';

// DELETE /api/transactions/[id]
export async function DELETE(
  req: Request,
  context: { params: { id: string } }
) {
  await connectDB();

  const { id } = context.params;

  try {
    const deleted = await Transaction.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json({ error: 'Transaction not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Transaction deleted successfully' });
  } catch (err) {
    console.error('❌ Error deleting transaction:', err);
    return NextResponse.json({ error: 'Failed to delete transaction' }, { status: 500 });
  }
}
