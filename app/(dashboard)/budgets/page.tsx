import Image from "next/image";

export default function BudgetsPage() {
  // Placeholder data (will be replaced with real data in Phase 3)
  const budgets = [
    { category: "Entertainment", maximum: 50.0, spent: 15.0, theme: "#277C78" },
    { category: "Bills", maximum: 750.0, spent: 395.5, theme: "#82C9D7" },
    { category: "Dining Out", maximum: 75.0, spent: 98.25, theme: "#F2CDAC" },
    {
      category: "Personal Care",
      maximum: 100.0,
      spent: 40.0,
      theme: "#626070",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Budgets</h1>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          + Add Budget
        </button>
      </div>

      {/* Budget Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {budgets.map((budget, index) => {
          const progress = Math.round((budget.spent / budget.maximum) * 100);
          return (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold text-gray-900">
                  {budget.category}
                </h3>
                <p className="text-sm text-gray-500">
                  ${budget.spent.toFixed(2)} of ${budget.maximum.toFixed(2)}
                </p>
              </div>
              <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${Math.min(progress, 100)}%`,
                    backgroundColor: budget.theme,
                  }}
                />
              </div>
              <div className="flex justify-between mt-2">
                <span className="text-xs text-gray-500">{progress}% used</span>
                <span className="text-xs text-gray-500">
                  ${(budget.maximum - budget.spent).toFixed(2)} remaining
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
