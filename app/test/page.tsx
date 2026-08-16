"use client";

import { createTransaction } from "@/actions/transactions";
import { useState } from "react";

export default function TestTransactionPage() {
  const [result, setResult] = useState(null);

  async function handleSubmit(formData: FormData) {
    // Get the raw date from the form
    const rawDate = formData.get("date") as string;

    // Convert to ISO string with timezone
    if (rawDate) {
      const dateObj = new Date(rawDate);
      if (!isNaN(dateObj.getTime())) {
        // Format as ISO string with timezone offset
        const isoDate = dateObj.toISOString();
        formData.set("date", isoDate);
      } else {
        console.error("Invalid date entered:", rawDate);
        setResult({
          error: "Invalid date format. Please select a valid date and time.",
        });
        return;
      }
    } else {
      setResult({ error: "Date is required." });
      return;
    }

    const response = await createTransaction(formData);
    setResult(response);
    console.log("Server action response:", response);
  }

  return (
    <div>
      <h1>Test Create Transaction</h1>

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
          {result.data && <pre>{JSON.stringify(result.data, null, 2)}</pre>}
        </div>
      )}

      <form action={handleSubmit}>
        <input name="name" placeholder="Name (e.g., Groceries)" required />
        <input name="category" placeholder="Category (e.g., Food)" required />
        <input
          name="amount"
          type="number"
          step="0.01"
          placeholder="Amount (e.g., 50.00)"
          required
        />
        <input name="date" type="datetime-local" required />
        <label>
          <input type="checkbox" name="recurring" /> Recurring?
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
