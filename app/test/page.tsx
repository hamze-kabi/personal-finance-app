"use client";

import { updateBudget } from "@/actions/budgets";
import { useState, useEffect } from "react";

export default function TestUpdateBudgetPage() {
  const [result, setResult] = useState(null);
  const [budgetId, setBudgetId] = useState("");
  const [category, setCategory] = useState("");
  const [maximum, setMaximum] = useState("");
  const [theme, setTheme] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    const id = parseInt(budgetId);
    if (isNaN(id)) {
      setResult({ error: "Invalid Budget ID. Please enter a number." });
      setLoading(false);
      return;
    }

    const data: any = {};
    if (category) data.category = category;
    if (maximum) data.maximum = parseFloat(maximum);
    if (theme) data.theme = theme;

    const response = await updateBudget(id, data);
    setResult(response);
    setLoading(false);
    console.log("Update budget response:", response);
  }

  return (
    <div style={{ padding: "2rem", maxWidth: "600px", margin: "0 auto" }}>
      <h1>Test Update Budget</h1>

      {result && (
        <div
          style={{
            margin: "1rem 0",
            padding: "1rem",
            backgroundColor: result.error ? "#fee2e2" : "#dcfce7",
            border: "1px solid",
            borderColor: result.error ? "#ef4444" : "#22c55e",
            borderRadius: "4px",
          }}
        >
          {result.error
            ? `❌ Error: ${result.error}`
            : `✅ Success: ${result.success}`}
          {result.data && (
            <pre style={{ marginTop: "0.5rem" }}>
              {JSON.stringify(result.data, null, 2)}
            </pre>
          )}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "1rem" }}>
          <label style={{ display: "block", fontWeight: "bold" }}>
            Budget ID (required):
            <input
              type="number"
              value={budgetId}
              onChange={(e) => setBudgetId(e.target.value)}
              placeholder="e.g., 1"
              style={{ width: "100%", padding: "0.5rem", marginTop: "0.25rem" }}
              required
            />
          </label>
          <small style={{ color: "#666" }}>
            Find the ID in the budgets table in Supabase Table Editor.
          </small>
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <label style={{ display: "block", fontWeight: "bold" }}>
            Category:
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="e.g., Entertainment"
              style={{ width: "100%", padding: "0.5rem", marginTop: "0.25rem" }}
            />
          </label>
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <label style={{ display: "block", fontWeight: "bold" }}>
            Maximum:
            <input
              type="number"
              step="0.01"
              value={maximum}
              onChange={(e) => setMaximum(e.target.value)}
              placeholder="e.g., 50.00"
              style={{ width: "100%", padding: "0.5rem", marginTop: "0.25rem" }}
            />
          </label>
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <label style={{ display: "block", fontWeight: "bold" }}>
            Theme (Hex color):
            <input
              type="text"
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              placeholder="e.g., #277C78"
              style={{ width: "100%", padding: "0.5rem", marginTop: "0.25rem" }}
            />
          </label>
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            padding: "0.5rem 1rem",
            backgroundColor: "#0070f3",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          {loading ? "Updating..." : "Update Budget"}
        </button>
      </form>
    </div>
  );
}
