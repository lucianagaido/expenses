// /api/expenses.js

let expenses = []; // in-memory storage (resets when the function reloads)

export default function handler(req, res) {
  res.setHeader("Content-Type", "application/json");

  if (req.method === "GET") {
    return res.status(200).json({
      success: true,
      data: expenses,
    });
  }

  if (req.method === "POST") {
    const { amount, description, category, date } = req.body || {};

    // Validate fields
    const missing = [];
    if (amount == null) missing.push("amount");
    if (!description) missing.push("description");
    if (!category) missing.push("category");
    if (!date) missing.push("date");

    if (missing.length > 0) {
      return res.status(400).json({
        success: false,
        error: "Missing required fields",
        missingFields: missing,
      });
    }

    const newExpense = {
      id: expenses.length + 1,
      amount,
      description,
      category,
      date,
    };

    expenses.push(newExpense);

    return res.status(201).json({
      success: true,
      message: "Expense added successfully",
      data: newExpense,
    });
  }

  // Unsupported method
  return res.status(405).json({
    success: false,
    error: `Method ${req.method} Not Allowed`,
  });
}
