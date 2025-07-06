import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Budget from '@/models/Budget';

export async function POST(req: Request) {
  await connectDB();

  try {
    const data = await req.json();
    if (!data.category || !data.amount) {
      return NextResponse.json({ error: 'Category and amount are required' }, { status: 400 });
    }

    const formattedMonth = data.month; // Sent from frontend

    const existing = await Budget.findOne({
      category: data.category,
      month: formattedMonth,
    });

    let savedBudget;
    if (existing) {
      existing.amount = data.amount;
      savedBudget = await existing.save();
    } else {
      savedBudget = await Budget.create({
        category: data.category,
        amount: data.amount,
        month: formattedMonth,
      });
    }

    return NextResponse.json({ message: 'Budget saved', budget: savedBudget });
  } catch (err) {
    console.error('❌ Error in POST /api/budgets:', err);
    return NextResponse.json({ error: 'Failed to save budget' }, { status: 500 });
  }
}

export async function GET() {
  await connectDB();
  try {
    const budgets = await Budget.find();
    return NextResponse.json(budgets);
  } catch (err) {
    return NextResponse.json({ error: 'Failed to fetch budgets' }, { status: 500 });
  }
}
