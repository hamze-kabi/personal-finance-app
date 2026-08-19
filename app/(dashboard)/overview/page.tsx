import Image from "next/image";
import { getTransactions, getBudgets, getPots } from "@/actions/transactions";
import ErrorMessage from "@/components/ui/ErrorMessage";

export default async function OverviewPage() {
  // Fetch real data from Supabase
  const [transactionsResult, budgetsResult, potsResult] = await Promise.all([
    getTransactions(),
    getBudgets(),
    getPots(),
  ]);

  // Handle errors
  if (transactionsResult.error || budgetsResult.error || potsResult.error) {
    const errorMessage =
      transactionsResult.error || budgetsResult.error || potsResult.error;
    return <ErrorMessage message={errorMessage} />;
  }

  // Get the data arrays
  const transactions = transactionsResult.data || [];
  const budgets = budgetsResult.data || [];
  const pots = potsResult.data || [];

  // Calculate balance from transactions
  const balance = transactions.reduce(
    (acc, t) => ({
      current: acc.current + t.amount,
      income: t.amount > 0 ? acc.income + t.amount : acc.income,
      expenses: t.amount < 0 ? acc.expenses + Math.abs(t.amount) : acc.expenses,
    }),
    { current: 0, income: 0, expenses: 0 },
  );

  // Get last 5 transactions for preview
  const recentTransactions = transactions.slice(0, 5);

  // Calculate total saved for pots
  const totalSaved = pots.reduce((sum, pot) => sum + pot.total, 0);

  // Get first 4 pots for preview
  const previewPots = pots.slice(0, 4);

  // Calculate budget spent amounts (from transactions)
  const budgetSpent = budgets.map((budget) => {
    const spent = transactions
      .filter((t) => t.category === budget.category && t.amount < 0)
      .reduce((sum, t) => sum + Math.abs(t.amount), 0);
    return {
      ...budget,
      spent,
      remaining: budget.maximum - spent,
      progress: Math.min(Math.round((spent / budget.maximum) * 100), 100),
    };
  });

  // Calculate recurring bills summary
  const recurringTransactions = transactions.filter(
    (t) => t.recurring === true,
  );
  const paidBills = recurringTransactions
    .filter((t) => new Date(t.date) < new Date())
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);
  const upcomingBills = recurringTransactions
    .filter((t) => new Date(t.date) >= new Date())
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);
  const dueSoonBills = recurringTransactions
    .filter((t) => {
      const dueDate = new Date(t.date);
      const today = new Date();
      const diffTime = dueDate.getTime() - today.getTime();
      const diffDays = diffTime / (1000 * 60 * 60 * 24);
      return diffDays <= 7 && diffDays >= 0;
    })
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);

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
                ${totalSaved.toFixed(2)}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {previewPots.map((pot) => (
                <div key={pot.id} className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-xs text-gray-500">{pot.name}</p>
                  <p className="font-semibold text-gray-900">
                    ${pot.total.toFixed(2)}
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
            {recentTransactions.length === 0 ? (
              <p className="text-sm text-gray-500">No transactions yet.</p>
            ) : (
              recentTransactions.map((tx) => (
                <div
                  key={tx.id}
                  className="flex justify-between items-center py-2 border-b border-gray-50 last:border-0"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-200 flex-shrink-0 relative">
                      {tx.avatar ? (
                        <Image
                          src={`/images/avatars/${tx.avatar.split("/").pop()}`}
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
                      <p className="text-xs text-gray-500">
                        {new Date(tx.date).toLocaleDateString("en-US", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                  <p className="font-semibold text-gray-900">
                    ${Math.abs(tx.amount).toFixed(2)}
                  </p>
                </div>
              ))
            )}
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
            {budgetSpent.length === 0 ? (
              <p className="text-sm text-gray-500">No budgets yet.</p>
            ) : (
              budgetSpent.map((budget) => (
                <div key={budget.id} className="space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">
                      {budget.category}
                    </span>
                    <span className="font-medium text-gray-900">
                      ${budget.spent.toFixed(2)} / ${budget.maximum.toFixed(2)}
                    </span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${budget.progress}%`,
                        backgroundColor: budget.theme || "#277C78",
                      }}
                    />
                  </div>
                </div>
              ))
            )}
            <div className="pt-3 border-t border-gray-100 flex justify-between">
              <span className="text-sm font-medium text-gray-900">
                Total Budget
              </span>
              <span className="font-semibold text-gray-900">
                ${budgets.reduce((sum, b) => sum + b.maximum, 0).toFixed(2)}
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
                ${paidBills.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Total Upcoming</span>
              <span className="font-medium text-gray-900">
                ${upcomingBills.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Due Soon</span>
              <span className="font-medium text-orange-500">
                ${dueSoonBills.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
