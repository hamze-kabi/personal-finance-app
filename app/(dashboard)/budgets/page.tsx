"use client";

import { useState, useEffect } from "react";
import { useStore } from "@/store";
import { getBudgets, getTransactions } from "@/actions/transactions";
import { createBudget, updateBudget, deleteBudget } from "@/actions/budgets";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import ErrorMessage from "@/components/ui/ErrorMessage";
import FormError from "@/components/ui/FormError";
import { Budget, Transaction } from "@/types";

export default function BudgetsPage() {
  const { budgetsLoading, setBudgetsLoading } = useStore();
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBudget, setEditingBudget] = useState(null);
  const [formData, setFormData] = useState({
    category: "",
    maximum: "",
    theme: "#277C78",
  });
  const [formError, setFormError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({
    category: "",
    maximum: "",
  });

  // Fetch data
  const fetchData = async () => {
    setBudgetsLoading(true);
    setError(null);
    const [budgetsResult, transactionsResult] = await Promise.all([
      getBudgets(),
      getTransactions(),
    ]);
    if (budgetsResult.error) {
      setError(budgetsResult.error);
    } else if (budgetsResult.data) {
      setBudgets(budgetsResult.data);
    }
    if (transactionsResult.error) {
      setError(transactionsResult.error);
    } else if (transactionsResult.data) {
      setTransactions(transactionsResult.data);
    }
    setBudgetsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Calculate spent amount for a category from transactions
  const getSpentForCategory = (category) => {
    const spent = transactions
      .filter((t) => t.category === category && t.amount < 0)
      .reduce((sum, t) => sum + Math.abs(t.amount), 0);
    return spent;
  };

  // Open modal for creating/editing
  const openModal = (budget = null) => {
    if (budget) {
      setEditingBudget(budget);
      setFormData({
        category: budget.category,
        maximum: budget.maximum.toString(),
        theme: budget.theme || "#277C78",
      });
    } else {
      setEditingBudget(null);
      setFormData({
        category: "",
        maximum: "",
        theme: "#277C78",
      });
    }
    setFormError("");
    setFieldErrors({ category: "", maximum: "" });
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setEditingBudget(null);
    setFormData({ category: "", maximum: "", theme: "#277C78" });
    setFormError("");
    setFieldErrors({ category: "", maximum: "" });
  };

  // Validate a single field
  const validateField = (name: string, value: string) => {
    switch (name) {
      case "category":
        if (!value.trim()) {
          return "Category is required";
        }
        if (value.trim().length < 2) {
          return "Category must be at least 2 characters";
        }
        return "";
      case "maximum":
        if (!value) {
          return "Maximum amount is required";
        }
        const num = parseFloat(value);
        if (isNaN(num) || num <= 0) {
          return "Maximum must be a positive number";
        }
        return "";
      default:
        return "";
    }
  };

  // Handle field change with validation
  const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    const errorMsg = validateField(name, value);
    setFieldErrors({ ...fieldErrors, [name]: errorMsg });
  };

  // Validate all fields before submitting
  const validateForm = () => {
    const categoryError = validateField("category", formData.category);
    const maximumError = validateField("maximum", formData.maximum);

    setFieldErrors({
      category: categoryError,
      maximum: maximumError,
    });

    return !categoryError && !maximumError;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormError("");

    // Client-side validation
    if (!validateForm()) {
      return;
    }

    const data = {
      category: formData.category,
      maximum: parseFloat(formData.maximum),
      theme: formData.theme,
    };

    let result;
    if (editingBudget) {
      result = await updateBudget(editingBudget.id, data);
    } else {
      result = await createBudget(data);
    }

    if (result.error) {
      setFormError(result.error);
    } else {
      closeModal();
      fetchData();
    }
  };

  // Handle delete
  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this budget?")) {
      const result = await deleteBudget(id);
      if (result.error) {
        alert(result.error);
      } else {
        fetchData();
      }
    }
  };

  if (budgetsLoading) {
    return <LoadingSpinner message="Loading budgets..." />;
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={fetchData} />;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Budgets</h1>
        <button
          onClick={() => openModal()}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          + Add Budget
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {budgets.length === 0 ? (
          <div className="col-span-2 text-center py-12 text-gray-500">
            No budgets yet. Click "Add Budget" to create one.
          </div>
        ) : (
          budgets.map((budget) => {
            const spent = getSpentForCategory(budget.category);
            const progress =
              budget.maximum > 0
                ? Math.min(Math.round((spent / budget.maximum) * 100), 100)
                : 0;

            return (
              <div
                key={budget.id}
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {budget.category}
                    </h3>
                    <p className="text-sm text-gray-500">
                      ${spent.toFixed(2)} of ${budget.maximum.toFixed(2)}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => openModal(budget)}
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
                      onClick={() => handleDelete(budget.id)}
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
                      backgroundColor: budget.theme || "#277C78",
                    }}
                  />
                </div>

                <div className="flex justify-between mt-2">
                  <span className="text-xs text-gray-500">
                    {progress}% used
                  </span>
                  <span className="text-xs text-gray-500">
                    ${(budget.maximum - spent).toFixed(2)} remaining
                  </span>
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
              {editingBudget ? "Edit Budget" : "Create Budget"}
            </h2>

            {formError && (
              <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm">
                {formError}
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <input
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleFieldChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none ${
                    fieldErrors.category
                      ? "border-red-500 focus:border-red-500"
                      : "border-gray-200 focus:ring-2 focus:ring-blue-500"
                  }`}
                  placeholder="e.g., Entertainment"
                />
                <FormError message={fieldErrors.category} />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Maximum Amount ($)
                </label>
                <input
                  type="number"
                  name="maximum"
                  step="0.01"
                  min="0"
                  value={formData.maximum}
                  onChange={handleFieldChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none ${
                    fieldErrors.maximum
                      ? "border-red-500 focus:border-red-500"
                      : "border-gray-200 focus:ring-2 focus:ring-blue-500"
                  }`}
                  placeholder="e.g., 50.00"
                />
                <FormError message={fieldErrors.maximum} />
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
                  {editingBudget ? "Update" : "Create"}
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
    </div>
  );
}
