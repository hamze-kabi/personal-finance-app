"use client";

import { useState, useEffect, useMemo } from "react";
import { useStore } from "@/store";
import { getTransactions } from "@/actions/transactions";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import ErrorMessage from "@/components/ui/ErrorMessage";
import Image from "next/image";

export default function RecurringBillsPage() {
  const { recurringBillsLoading, setRecurringBillsLoading } = useStore();
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchTransactions = async () => {
    setRecurringBillsLoading(true);
    setError(null);
    const result = await getTransactions();
    if (result.error) {
      setError(result.error);
    } else if (result.data) {
      setTransactions(result.data);
    }
    setRecurringBillsLoading(false);
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const recurringBills = useMemo(() => {
    const bills = transactions.filter((t) => t.recurring === true);
    if (searchQuery) {
      return bills.filter((b) =>
        b.name.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }
    return bills;
  }, [transactions, searchQuery]);

  const summary = useMemo(() => {
    const today = new Date();
    let paid = 0;
    let upcoming = 0;
    let dueSoon = 0;

    recurringBills.forEach((bill) => {
      const dueDate = new Date(bill.date);
      const diffTime = dueDate.getTime() - today.getTime();
      const diffDays = diffTime / (1000 * 60 * 60 * 24);

      if (diffDays < 0) {
        paid += Math.abs(bill.amount);
      } else {
        upcoming += Math.abs(bill.amount);
        if (diffDays <= 7) {
          dueSoon += Math.abs(bill.amount);
        }
      }
    });

    return { paid, upcoming, dueSoon };
  }, [recurringBills]);

  if (recurringBillsLoading) {
    return <LoadingSpinner message="Loading recurring bills..." />;
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={fetchTransactions} />;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Recurring Bills</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500">Paid Bills</p>
          <p className="text-2xl font-bold text-green-600 mt-1">
            ${summary.paid.toFixed(2)}
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500">Total Upcoming</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">
            ${summary.upcoming.toFixed(2)}
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500">Due Soon</p>
          <p className="text-2xl font-bold text-orange-500 mt-1">
            ${summary.dueSoon.toFixed(2)}
          </p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search recurring bills..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="text-sm text-gray-500">
        Showing {recurringBills.length} recurring bills
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {recurringBills.length === 0 ? (
          <div className="p-6 text-center text-gray-500">
            {searchQuery
              ? "No recurring bills match your search."
              : "No recurring bills found."}
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {recurringBills.map((bill) => {
              const dueDate = new Date(bill.date);
              const today = new Date();
              const diffTime = dueDate.getTime() - today.getTime();
              const diffDays = diffTime / (1000 * 60 * 60 * 24);
              const isPaid = diffDays < 0;
              const isDueSoon = diffDays >= 0 && diffDays <= 7;

              let statusText = "Upcoming";
              let statusColor = "bg-blue-100 text-blue-700";
              if (isPaid) {
                statusText = "Paid";
                statusColor = "bg-green-100 text-green-700";
              } else if (isDueSoon) {
                statusText = "Due Soon";
                statusColor = "bg-orange-100 text-orange-700";
              }

              return (
                <div
                  key={bill.id}
                  className="flex justify-between items-center px-6 py-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200 flex-shrink-0 relative">
                      {bill.avatar ? (
                        <Image
                          src={`/images/avatars/${bill.avatar.split("/").pop()}`}
                          alt={bill.name}
                          width={40}
                          height={40}
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-500 text-sm font-medium">
                          {bill.name.charAt(0)}
                        </div>
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{bill.name}</p>
                      <p className="text-sm text-gray-500">
                        Due:{" "}
                        {dueDate.toLocaleDateString("en-US", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <p className="font-semibold text-gray-900">
                      ${Math.abs(bill.amount).toFixed(2)}
                    </p>
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${statusColor}`}
                    >
                      {statusText}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
