"use client";

import { useState, useEffect, useMemo } from "react";
import { useStore } from "@/store";
import { getTransactions } from "@/actions/transactions";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import ErrorMessage from "@/components/ui/ErrorMessage";
import Image from "next/image";
import { Transaction } from "@/types";

export default function TransactionsPage() {
  const {
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    sortOption,
    setSortOption,
    transactionsLoading,
    setTransactionsLoading,
  } = useStore();

  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Fetch transactions
  const fetchTransactions = async () => {
    setTransactionsLoading(true);
    setError(null);
    const result = await getTransactions();
    if (result.error) {
      setError(result.error);
    } else if (result.data) {
      setTransactions(result.data);
      const uniqueCategories = [...new Set(result.data.map((t) => t.category))];
      setCategories(uniqueCategories);
    }
    setTransactionsLoading(false);
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  // Filter and sort transactions
  const filteredAndSortedTransactions = useMemo(() => {
    let result = [...transactions];

    if (searchQuery) {
      result = result.filter((t) =>
        t.name.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    if (selectedCategory) {
      result = result.filter((t) => t.category === selectedCategory);
    }

    switch (sortOption) {
      case "newest":
        result.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
        );
        break;
      case "oldest":
        result.sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
        );
        break;
      case "highest":
        result.sort((a, b) => Math.abs(b.amount) - Math.abs(a.amount));
        break;
      case "lowest":
        result.sort((a, b) => Math.abs(a.amount) - Math.abs(b.amount));
        break;
      default:
        break;
    }

    return result;
  }, [transactions, searchQuery, selectedCategory, sortOption]);

  // Pagination
  const totalPages = Math.ceil(
    filteredAndSortedTransactions.length / itemsPerPage,
  );
  const paginatedTransactions = filteredAndSortedTransactions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory, sortOption]);

  // Show loading state
  if (transactionsLoading) {
    return <LoadingSpinner message="Loading transactions..." />;
  }

  // Show error state
  if (error) {
    return <ErrorMessage message={error} onRetry={fetchTransactions} />;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Transactions</h1>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search transactions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="sm:w-48">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
        <div className="sm:w-48">
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="highest">Highest Amount</option>
            <option value="lowest">Lowest Amount</option>
          </select>
        </div>
      </div>

      <div className="text-sm text-gray-500">
        Showing {paginatedTransactions.length} of{" "}
        {filteredAndSortedTransactions.length} transactions
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {paginatedTransactions.length === 0 ? (
          <div className="p-6 text-center text-gray-500">
            {searchQuery || selectedCategory
              ? "No transactions match your filters."
              : "No transactions found."}
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {paginatedTransactions.map((tx) => (
              <div
                key={tx.id}
                className="flex justify-between items-center px-6 py-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200 flex-shrink-0 relative">
                    {tx.avatar ? (
                      <Image
                        src={`/images/avatars/${tx.avatar.split("/").pop()}`}
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
                      {tx.category} ·{" "}
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
            ))}
          </div>
        )}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2">
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 border border-gray-200 rounded-lg disabled:opacity-50 hover:bg-gray-50 transition-colors"
          >
            Previous
          </button>
          <span className="text-sm text-gray-500">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 border border-gray-200 rounded-lg disabled:opacity-50 hover:bg-gray-50 transition-colors"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
