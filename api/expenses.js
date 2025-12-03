/let expenses = []; // in-memory storage (resets when the function reloads)

export default async function handler(req, res) {
  res.setHeader("Content-Type", "application/json");

  // Handle GET request
  if (req.method === "GET") {
    return res.status(200).json({
      success: true,
      data: expenses,
    });
  }

  // Handle POST request
  if (req.method === "POST") {
    // Make sure to parse the request body
    const { amount, description, category, date } = req.body || {};

    // Validate fields
    const missing = [];
    if (amount == null) missing.push("amount");
    if (!description) missing.push("description");
    if (!category) missing.push("category"); // Optional, remove if not used in the frontend
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
      category: category || "Uncategorized", // Default to "Uncategorized" if category is missing
      date,
    };

    // Store the new expense
    expenses.push(newExpense);

    // Send a successful response with the new expense
    return res.status(201).json({
      success: true,
      message: "Expense added successfully",
      data: newExpense,
    });
  }

  // Handle unsupported methods
  return res.status(405).json({
    success: false,
    error: `Method ${req.method} Not Allowed`,
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
