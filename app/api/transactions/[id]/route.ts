// import { NextResponse } from 'next/server';
// import { NextRequest } from 'next/server';
// import { connectDB } from '@/lib/db';
// import Transaction from '@/models/Transaction';

// export async function DELETE(
//   req: NextRequest,
//   { params }: { params: { id: string } }
// ) {
//   await connectDB();

//   const { id } = params;

//   try {
//     const deleted = await Transaction.findByIdAndDelete(id);

//     if (!deleted) {
//       return NextResponse.json({ error: 'Transaction not found' }, { status: 404 });
//     }

//     return NextResponse.json({ message: 'Transaction deleted successfully' });
//   } catch (err) {
//     console.error('❌ Error deleting transaction:', err);
//     return NextResponse.json({ error: 'Failed to delete transaction' }, { status: 500 });
//   }
// }
import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Transaction from '@/models/Transaction';

// ✅ Correct format for App Router dynamic route
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  await connectDB();

  const { id } = params;

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
