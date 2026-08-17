import Image from "next/image";

export default function TransactionsPage() {
  // Placeholder data (will be replaced with real data in Phase 3)
  const transactions = [
    {
      name: "Emma Richardson",
      amount: 75.5,
      date: "19 Aug 2024",
      category: "General",
      avatar: "/images/avatars/emma-richardson.jpg",
    },
    {
      name: "Savory Bites Bistro",
      amount: -55.5,
      date: "19 Aug 2024",
      category: "Dining Out",
      avatar: "/images/avatars/savory-bites-bistro.jpg",
    },
    {
      name: "Daniel Carter",
      amount: -42.3,
      date: "18 Aug 2024",
      category: "General",
      avatar: "/images/avatars/daniel-carter.jpg",
    },
    {
      name: "Sun Park",
      amount: 120.0,
      date: "17 Aug 2024",
      category: "General",
      avatar: "/images/avatars/sun-park.jpg",
    },
    {
      name: "Urban Services Hub",
      amount: -65.0,
      date: "17 Aug 2024",
      category: "General",
      avatar: "/images/avatars/urban-services-hub.jpg",
    },
    {
      name: "Liam Hughes",
      amount: 65.75,
      date: "15 Aug 2024",
      category: "Groceries",
      avatar: "/images/avatars/liam-hughes.jpg",
    },
    {
      name: "Lily Ramirez",
      amount: 50.0,
      date: "14 Aug 2024",
      category: "General",
      avatar: "/images/avatars/lily-ramirez.jpg",
    },
    {
      name: "Ethan Clark",
      amount: -32.5,
      date: "13 Aug 2024",
      category: "Dining Out",
      avatar: "/images/avatars/ethan-clark.jpg",
    },
    {
      name: "James Thompson",
      amount: -5.0,
      date: "11 Aug 2024",
      category: "Entertainment",
      avatar: "/images/avatars/james-thompson.jpg",
    },
    {
      name: "Pixel Playground",
      amount: -10.0,
      date: "11 Aug 2024",
      category: "Entertainment",
      avatar: "/images/avatars/pixel-playground.jpg",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Transactions</h1>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          placeholder="Search transactions..."
          className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option value="">All Categories</option>
          <option value="General">General</option>
          <option value="Dining Out">Dining Out</option>
          <option value="Groceries">Groceries</option>
          <option value="Entertainment">Entertainment</option>
        </select>
        <select className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="highest">Highest Amount</option>
          <option value="lowest">Lowest Amount</option>
        </select>
      </div>

      {/* Transactions List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="divide-y divide-gray-100">
          {transactions.map((tx, index) => (
            <div
              key={index}
              className="flex justify-between items-center px-6 py-4 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                  {tx.avatar ? (
                    <Image
                      src={tx.avatar}
                      alt={tx.name}
                      width={40}
                      height={40}
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-500 text-sm font-medium">
                      {tx.name.charAt(0)}
                    </div>
                  )}
                </div>
                <div>
                  <p className="font-medium text-gray-900">{tx.name}</p>
                  <p className="text-sm text-gray-500">
                    {tx.category} · {tx.date}
                  </p>
                </div>
              </div>
              <p className={`font-semibold text-gray-900`}>
                ${Math.abs(tx.amount).toFixed(2)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
