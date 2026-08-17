import Image from "next/image";

export default function RecurringBillsPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Recurring Bills</h1>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500">Paid Bills</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">$190.00</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500">Total Upcoming</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">$194.98</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500">Due Soon</p>
          <p className="text-2xl font-bold text-orange-500 mt-1">$59.98</p>
        </div>
      </div>

      {/* Bills List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="divide-y divide-gray-100">
          {[
            {
              name: "Spark Electric Solutions",
              amount: 100.0,
              due: "Aug 2, 2024",
              status: "paid",
            },
            {
              name: "Aqua Flow Utilities",
              amount: 100.0,
              due: "Jul 30, 2024",
              status: "paid",
            },
            {
              name: "EcoFuel Energy",
              amount: 35.0,
              due: "Jul 29, 2024",
              status: "paid",
            },
            {
              name: "Nimbus Data Storage",
              amount: 9.99,
              due: "Jul 21, 2024",
              status: "upcoming",
            },
            {
              name: "Pixel Playground",
              amount: 10.0,
              due: "Aug 11, 2024",
              status: "paid",
            },
            {
              name: "Elevate Education",
              amount: 50.0,
              due: "Aug 4, 2024",
              status: "upcoming",
            },
          ].map((bill, index) => (
            <div
              key={index}
              className="flex justify-between items-center px-6 py-4 hover:bg-gray-50 transition-colors"
            >
              <div>
                <p className="font-medium text-gray-900">{bill.name}</p>
                <p className="text-sm text-gray-500">Due: {bill.due}</p>
              </div>
              <div className="flex items-center gap-4">
                <span
                  className={`font-semibold ${
                    bill.status === "paid" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  ${bill.amount.toFixed(2)}
                </span>
                <span
                  className={`px-2 py-1 text-xs rounded-full ${
                    bill.status === "paid"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {bill.status === "paid" ? "Paid" : "Upcoming"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
