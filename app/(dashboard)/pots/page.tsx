import Image from "next/image";

export default function PotsPage() {
  // Placeholder data (will be replaced with real data in Phase 3)
  const pots = [
    { name: "Savings", target: 2000.0, total: 159.0, theme: "#277C78" },
    { name: "Concert Ticket", target: 150.0, total: 110.0, theme: "#626070" },
    { name: "Gift", target: 150.0, total: 110.0, theme: "#82C9D7" },
    { name: "New Laptop", target: 1000.0, total: 10.0, theme: "#F2CDAC" },
    { name: "Holiday", target: 1440.0, total: 531.0, theme: "#826CB0" },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Pots</h1>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          + Add Pot
        </button>
      </div>

      {/* Pots Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {pots.map((pot, index) => {
          const progress = Math.round((pot.total / pot.target) * 100);
          return (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold text-gray-900">{pot.name}</h3>
                <p className="text-sm text-gray-500">
                  ${pot.total.toFixed(2)} / ${pot.target.toFixed(2)}
                </p>
              </div>
              <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${Math.min(progress, 100)}%`,
                    backgroundColor: pot.theme,
                  }}
                />
              </div>
              <div className="flex justify-between mt-2">
                <span className="text-xs text-gray-500">
                  {progress}% complete
                </span>
                <span className="text-xs text-gray-500">
                  ${(pot.target - pot.total).toFixed(2)} remaining
                </span>
              </div>
              <div className="flex gap-2 mt-4">
                <button className="flex-1 px-4 py-2 text-sm font-medium text-center border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  Add Money
                </button>
                <button className="flex-1 px-4 py-2 text-sm font-medium text-center border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  Withdraw
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
