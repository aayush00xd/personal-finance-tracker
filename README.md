# 💰 Personal Finance Tracker

A full-stack web application to track your income, expenses, monthly budgets, and spending insights.

## 🚀 Features

- Add, edit, and delete transactions (amount, description, category, date)
- Visualize monthly expenses in bar charts
- See category-wise breakdown with pie chart
- Set monthly budgets by category
- Compare actual vs. budgeted spending
- Get insights on overspending or savings
- Mobile-friendly responsive design
- Built with Next.js, React, Tailwind, MongoDB, Recharts, and shadcn/ui

## 🛠️ Tech Stack

- **Frontend**: Next.js (App Router), React, Tailwind CSS, shadcn/ui
- **Backend**: API Routes (app/api), MongoDB with Mongoose
- **Charts**: Recharts (BarChart, PieChart)
## 📂 Folder Structure

/app
/api
/transactions
/budgets
/components
TransactionForm.tsx
TransactionList.tsx
TransactionChart.tsx
CategoryPieChart.tsx
BudgetForm.tsx
BudgetComparisonChart.tsx
BudgetInsights.tsx
page.tsx
/lib
db.ts
/models
Transaction.ts
Budget.ts

bash
Copy
Edit

## 🌐 Live Demo

> Add your Vercel link here after deployment  
`https://personal-finance-tracker.vercel.app`

## 🧪 How to Run Locally

1. Clone the repo:

```bash
git clone https://github.com/aayush00xd/personal-finance-tracker.git
cd personal-finance-tracker
Install dependencies:

bash
Copy
Edit
npm install
Setup .env.local:

env
Copy
Edit
MONGODB_URI=your_mongodb_connection_string
Run the app:

bash
Copy
Edit
npm run dev
The app runs at http://localhost:3000.

