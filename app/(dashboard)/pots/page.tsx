"use client";

import { useState, useEffect } from "react";
import { useStore } from "@/store";
import { getPots } from "@/actions/transactions";
import { createPot, updatePot, deletePot } from "@/actions/pots";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import ErrorMessage from "@/components/ui/ErrorMessage";

export default function PotsPage() {
  const { potsLoading, setPotsLoading } = useStore();
  const [pots, setPots] = useState([]);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTransactionModalOpen, setIsTransactionModalOpen] = useState(false);
  const [editingPot, setEditingPot] = useState(null);
  const [selectedPot, setSelectedPot] = useState(null);
  const [transactionType, setTransactionType] = useState("add");
  const [formData, setFormData] = useState({
    name: "",
    target: "",
    theme: "#277C78",
  });
  const [transactionAmount, setTransactionAmount] = useState("");
  const [formError, setFormError] = useState("");

  const fetchPots = async () => {
    setPotsLoading(true);
    setError(null);
    const result = await getPots();
    if (result.error) {
      setError(result.error);
    } else if (result.data) {
      setPots(result.data);
    }
    setPotsLoading(false);
  };

  useEffect(() => {
    fetchPots();
  }, []);

  const openModal = (pot = null) => {
    if (pot) {
      setEditingPot(pot);
      setFormData({
        name: pot.name,
        target: pot.target.toString(),
        theme: pot.theme || "#277C78",
      });
    } else {
      setEditingPot(null);
      setFormData({
        name: "",
        target: "",
        theme: "#277C78",
      });
    }
    setFormError("");
    setIsModalOpen(true);
  };

  const openTransactionModal = (pot, type) => {
    setSelectedPot(pot);
    setTransactionType(type);
    setTransactionAmount("");
    setFormError("");
    setIsTransactionModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingPot(null);
    setFormData({ name: "", target: "", theme: "#277C78" });
    setFormError("");
  };

  const closeTransactionModal = () => {
    setIsTransactionModalOpen(false);
    setSelectedPot(null);
    setTransactionAmount("");
    setFormError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");

    const data = {
      name: formData.name,
      target: parseFloat(formData.target),
      theme: formData.theme,
    };

    let result;
    if (editingPot) {
      result = await updatePot(editingPot.id, data);
    } else {
      result = await createPot(data);
    }

    if (result.error) {
      setFormError(result.error);
    } else {
      closeModal();
      fetchPots();
    }
  };

  const handleTransaction = async (e) => {
    e.preventDefault();
    setFormError("");

    const amount = parseFloat(transactionAmount);
    if (isNaN(amount) || amount <= 0) {
      setFormError("Please enter a valid amount.");
      return;
    }

    if (transactionType === "withdraw" && amount > selectedPot.total) {
      setFormError("Insufficient balance in this pot.");
      return;
    }

    const newTotal =
      transactionType === "add"
        ? selectedPot.total + amount
        : selectedPot.total - amount;

    const result = await updatePot(selectedPot.id, { total: newTotal });

    if (result.error) {
      setFormError(result.error);
    } else {
      closeTransactionModal();
      fetchPots();
    }
  };

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this pot?")) {
      const result = await deletePot(id);
      if (result.error) {
        alert(result.error);
      } else {
        fetchPots();
      }
    }
  };

  if (potsLoading) {
    return <LoadingSpinner message="Loading pots..." />;
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={fetchPots} />;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Pots</h1>
        <button
          onClick={() => openModal()}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          + Add Pot
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {pots.length === 0 ? (
          <div className="col-span-2 text-center py-12 text-gray-500">
            No pots yet. Click "Add Pot" to create one.
          </div>
        ) : (
          pots.map((pot) => {
            const progress =
              pot.target > 0
                ? Math.min(Math.round((pot.total / pot.target) * 100), 100)
                : 0;

            return (
              <div
                key={pot.id}
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-semibold text-gray-900">{pot.name}</h3>
                    <p className="text-sm text-gray-500">
                      ${pot.total.toFixed(2)} / ${pot.target.toFixed(2)}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => openModal(pot)}
                      className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                        />
                      </svg>
                    </button>
                    <button
                      onClick={() => handleDelete(pot.id)}
                      className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </div>
                </div>

                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-300"
                    style={{
                      width: `${progress}%`,
                      backgroundColor: pot.theme || "#277C78",
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
                  <button
                    onClick={() => openTransactionModal(pot, "add")}
                    className="flex-1 px-4 py-2 text-sm font-medium text-center border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Add Money
                  </button>
                  <button
                    onClick={() => openTransactionModal(pot, "withdraw")}
                    className="flex-1 px-4 py-2 text-sm font-medium text-center border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Withdraw
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              {editingPot ? "Edit Pot" : "Create Pot"}
            </h2>

            {formError && (
              <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm">
                {formError}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Pot Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Vacation Fund"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Target Amount ($)
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.target}
                  onChange={(e) =>
                    setFormData({ ...formData, target: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., 1000.00"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Theme Color
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={formData.theme}
                    onChange={(e) =>
                      setFormData({ ...formData, theme: e.target.value })
                    }
                    className="w-10 h-10 rounded-lg cursor-pointer"
                  />
                  <span className="text-sm text-gray-500">
                    {formData.theme}
                  </span>
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {editingPot ? "Update" : "Create"}
                </button>
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isTransactionModalOpen && selectedPot && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              {transactionType === "add"
                ? "Add Money to"
                : "Withdraw Money from"}{" "}
              {selectedPot.name}
            </h2>

            <p className="text-sm text-gray-500 mb-4">
              Current balance: ${selectedPot.total.toFixed(2)}
            </p>

            {formError && (
              <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm">
                {formError}
              </div>
            )}

            <form onSubmit={handleTransaction} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Amount ($)
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0.01"
                  value={transactionAmount}
                  onChange={(e) => setTransactionAmount(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., 50.00"
                  required
                />
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {transactionType === "add" ? "Add" : "Withdraw"}
                </button>
                <button
                  type="button"
                  onClick={closeTransactionModal}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
