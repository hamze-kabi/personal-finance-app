import Image from "next/image";
import { getTransactions, getBudgets, getPots } from "@/actions/transactions"; // Future use

export default async function OverviewPage() {
  // TODO: Replace with real data from database (Phase 3)
  const balance = {
    current: 4836.0,
    income: 3814.25,
    expenses: 1700.5,
  };

  // Placeholder data for now
  const potsData = {
    totalSaved: 850,
    pots: [
      { name: "Savings", amount: 159 },
      { name: "Gift", amount: 40 },
      { name: "Concert Ticket", amount: 110 },
      { name: "New Laptop", amount: 10 },
    ],
  };

  const transactions = [
    {
      name: "Emma Richardson",
      amount: 75.5,
      date: "19 Aug 2024",
      avatar: "/images/avatars/emma-richardson.jpg",
    },
    {
      name: "Savory Bites Bistro",
      amount: -55.5,
      date: "19 Aug 2024",
      avatar: "/images/avatars/savory-bites-bistro.jpg",
    },
    {
      name: "Daniel Carter",
      amount: -42.3,
      date: "18 Aug 2024",
      avatar: "/images/avatars/daniel-carter.jpg",
    },
    {
      name: "Sun Park",
      amount: 120.0,
      date: "17 Aug 2024",
      avatar: "/images/avatars/sun-park.jpg",
    },
    {
      name: "Urban Services Hub",
      amount: -65.0,
      date: "17 Aug 2024",
      avatar: "/images/avatars/urban-services-hub.jpg",
    },
  ];

  const budgets = [
    { category: "Entertainment", amount: 50.0 },
    { category: "Bills", amount: 750.0 },
    { category: "Dining Out", amount: 75.0 },
    { category: "Personal Care", amount: 100.0 },
  ];

  const recurringBills = {
    paid: 190.0,
    upcoming: 194.98,
    dueSoon: 59.98,
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Overview</h1>
      </div>

      {/* Balance Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Current Balance */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500">Current Balance</p>
          <p className="text-3xl font-bold text-gray-900 mt-1">
            ${balance.current.toFixed(2)}
          </p>
        </div>

        {/* Income */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500">Income</p>
          <p className="text-3xl font-bold text-gray-900 mt-1">
            ${balance.income.toFixed(2)}
          </p>
        </div>

        {/* Expenses */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500">Expenses</p>
          <p className="text-3xl font-bold text-gray-900 mt-1">
            ${balance.expenses.toFixed(2)}
          </p>
        </div>
      </div>

      {/* Grid Layout for Pots, Transactions, Budgets, Bills */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pots Section */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Pots</h2>
            <a
              href="/pots"
              className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1"
            >
              See Details
              <Image
                src="/icons/icon-caret-right.svg"
                alt="Go to Pots"
                width={16}
                height={16}
              />
            </a>
          </div>
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Image
                src="/icons/icon-pot.svg"
                alt="Pot Icon"
                width={20}
                height={20}
              />
              <span className="text-sm text-gray-500">Total Saved</span>
              <span className="font-semibold text-gray-900 ml-auto">
                ${potsData.totalSaved.toFixed(2)}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {potsData.pots.map((pot, index) => (
                <div key={index} className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-xs text-gray-500">{pot.name}</p>
                  <p className="font-semibold text-gray-900">
                    ${pot.amount.toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Transactions Section */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-900">
              Transactions
            </h2>
            <a
              href="/transactions"
              className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1"
            >
              View All
              <Image
                src="/icons/icon-caret-right.svg"
                alt="Go to Transactions"
                width={16}
                height={16}
              />
            </a>
          </div>
          <div className="space-y-3">
            {transactions.map((tx, index) => (
              <div
                key={index}
                className="flex justify-between items-center py-2 border-b border-gray-50 last:border-0"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                    {tx.avatar ? (
                      <Image
                        src={tx.avatar}
                        alt={tx.name}
                        width={32}
                        height={32}
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-500 text-sm">
                        {tx.name.charAt(0)}
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 text-sm">
                      {tx.name}
                    </p>
                    <p className="text-xs text-gray-500">{tx.date}</p>
                  </div>
                </div>
                <p className={`font-semibold text-gray-900`}>
                  ${Math.abs(tx.amount).toFixed(2)}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Budgets Section */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Budgets</h2>
            <a
              href="/budgets"
              className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1"
            >
              See Details
              <Image
                src="/icons/icon-caret-right.svg"
                alt="Go to Budgets"
                width={16}
                height={16}
              />
            </a>
          </div>
          <div className="space-y-3">
            {budgets.map((budget, index) => (
              <div key={index} className="flex justify-between items-center">
                <span className="text-sm text-gray-600">{budget.category}</span>
                <span className="font-medium text-gray-900">
                  ${budget.amount.toFixed(2)}
                </span>
              </div>
            ))}
            <div className="pt-3 border-t border-gray-100 flex justify-between">
              <span className="text-sm font-medium text-gray-900">
                Total Budget
              </span>
              <span className="font-semibold text-gray-900">
                ${budgets.reduce((sum, b) => sum + b.amount, 0).toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        {/* Recurring Bills Section */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-900">
              Recurring Bills
            </h2>
            <a
              href="/recurring-bills"
              className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1"
            >
              See Details
              <Image
                src="/icons/icon-caret-right.svg"
                alt="Go to Recurring Bills"
                width={16}
                height={16}
              />
            </a>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Paid Bills</span>
              <span className="font-medium text-gray-900">
                ${recurringBills.paid.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Total Upcoming</span>
              <span className="font-medium text-gray-900">
                ${recurringBills.upcoming.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Due Soon</span>
              <span className="font-medium text-orange-500">
                ${recurringBills.dueSoon.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
