let expenses = []; // in-memory storage (resets when the function reloads)

export default function handler(req, res) {
  res.setHeader("Content-Type", "application/json");

  // Handle GET request (retrieve all expenses)
  if (req.method === "GET") {
    return res.status(200).json({
      success: true,
      data: expenses,
    });
  }

  // Handle POST request (add new expense)
  if (req.method === "POST") {
    const { amount, description, category, date } = req.body || {};

    // Validate fields
    const missing = [];
    if (amount == null) missing.push("amount");
    if (!description) missing.push("description");
    if (!date) missing.push("date");

    if (missing.length > 0) {
      return res.status(400).json({
        success: false,
        error: "Missing required fields",
        missingFields: missing,
      });
    }

    // Create a new expense object
    const newExpense = {
      id: expenses.length + 1,
      amount,
      description,
      category: category || 'Uncategorized', // Default to 'Uncategorized' if no category is provided
      date,
    };

    // Store the new expense in the in-memory array
    expenses.push(newExpense);

    return res.status(201).json({
      success: true,
      message: "Expense added successfully",
      data: newExpense,
    });
  }

  // Handle unsupported methods (e.g., PUT, DELETE)
  return res.status(405).json({
    success: false,
    error: `Method ${req.method} Not Allowed`,
  });
}

