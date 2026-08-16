"use client";

import { deletePot } from "@/actions/pots";
import { useState } from "react";

export default function TestDeletePotPage() {
  const [result, setResult] = useState(null);
  const [potId, setPotId] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    const id = parseInt(potId);
    if (isNaN(id)) {
      setResult({ error: "Invalid Pot ID. Please enter a number." });
      setLoading(false);
      return;
    }

    const response = await deletePot(id);
    setResult(response);
    setLoading(false);
    console.log("Delete pot response:", response);
  }

  return (
    <div style={{ padding: "2rem", maxWidth: "600px", margin: "0 auto" }}>
      <h1>Test Delete Pot</h1>

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
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "1rem" }}>
          <label style={{ display: "block", fontWeight: "bold" }}>
            Pot ID (required):
            <input
              type="number"
              value={potId}
              onChange={(e) => setPotId(e.target.value)}
              placeholder="e.g., 1"
              style={{
                width: "100%",
                padding: "0.5rem",
                marginTop: "0.25rem",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
              required
            />
          </label>
          <small style={{ color: "#666" }}>
            Find the ID in the pots table in Supabase Table Editor.
          </small>
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            padding: "0.5rem 1rem",
            backgroundColor: "#dc2626",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          {loading ? "Deleting..." : "Delete Pot"}
        </button>
      </form>
    </div>
  );
}
