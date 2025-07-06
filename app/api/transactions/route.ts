import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Transaction from '@/models/Transaction';

export async function GET() {
  await connectDB();
  const transactions = await Transaction.find().sort({ date: -1 });
  return NextResponse.json(transactions);
}

export async function POST(req: Request) {
  await connectDB();
  const { amount, description, date } = await req.json();

  if (!amount || !description || !date) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  }

  const transaction = await Transaction.create({ amount, description, date });
  return NextResponse.json(transaction);
}
