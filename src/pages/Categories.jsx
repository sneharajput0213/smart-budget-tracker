import { useState } from "react";
import { useBudget } from "../context/BudgetContext";
import Graph from "../components/Graph";

const CATEGORY_COLORS = {
  Food: "bg-emerald-500",
  Travel: "bg-blue-500",
  Shopping: "bg-purple-500",
  Bills: "bg-amber-500",
  Others: "bg-gray-500",
};

export default function Categories() {
  const {
    expensesForSelectedMonth,
    selectedMonth,
    categories,
    categoryLimits,
    addCategory,
    deleteCategory,
    setCategoryLimit,
  } = useBudget();

  const [newCategory, setNewCategory] = useState("");
  const [editingLimit, setEditingLimit] = useState(null);
  const [limitValue, setLimitValue] = useState("");

  const byCategory = categories.reduce((acc, cat) => {
    acc[cat] = expensesForSelectedMonth
      .filter((e) => e.category === cat)
      .reduce((sum, e) => sum + Number(e.amount), 0);
    return acc;
  }, {});

  const total = Object.values(byCategory).reduce((a, b) => a + b, 0);

  const handleAddCategory = () => {
    const trimmed = newCategory.trim();
    if (trimmed && !categories.includes(trimmed)) {
      addCategory(trimmed);
      setNewCategory("");
    }
  };

  const handleSetLimit = (category) => {
    const num = Number(limitValue);
    if (!Number.isNaN(num) && num > 0) {
      setCategoryLimit(category, num);
      setEditingLimit(null);
      setLimitValue("");
    }
  };

  const handleRemoveLimit = (category) => {
    setCategoryLimit(category, null);
    setEditingLimit(null);
    setLimitValue("");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Categories</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
          Manage categories and set spending limits for {selectedMonth}
        </p>
      </div>

      {/* Add New Category */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
        <h2 className="text-lg font-medium text-gray-800 dark:text-white mb-4">
          Add New Category
        </h2>
        <div className="flex gap-2">
          <input
            type="text"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAddCategory()}
            placeholder="Enter category name"
            className="flex-1 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
          />
          <button
            type="button"
            onClick={handleAddCategory}
            className="rounded-lg bg-brand px-4 py-2 text-sm font-medium text-white hover:bg-brand-dark transition-colors"
          >
            Add Category
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Category Breakdown with Limits */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm hover:shadow-md transition-shadow">
          <h2 className="text-lg font-medium text-gray-800 dark:text-white mb-4">
            Category Breakdown
          </h2>
          <div className="space-y-4">
            {categories.map((cat) => {
              const spent = byCategory[cat] ?? 0;
              const limit = categoryLimits[cat];
              const percentUsed = limit
                ? Math.min((spent / limit) * 100, 100).toFixed(1)
                : null;

              return (
                <div
                  key={cat}
                  className="border-b border-gray-100 dark:border-gray-700 last:border-0 pb-4 last:pb-0"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <span
                        className={`w-3 h-3 rounded-full ${CATEGORY_COLORS[cat] ?? "bg-gray-400"
                          }`}
                      />
                      <span className="font-medium text-gray-700 dark:text-gray-300">{cat}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-900 dark:text-white font-medium">
                        ₹{spent.toFixed(2)}
                      </span>
                      {categories.length > 5 && cat !== "Food" && cat !== "Travel" && cat !== "Shopping" && cat !== "Bills" && cat !== "Others" && (
                        <button
                          type="button"
                          onClick={() => deleteCategory(cat)}
                          className="text-red-600 hover:text-red-700 text-xs"
                          title="Delete category"
                        >
                          ×
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Category Limit */}
                  {limit ? (
                    <div className="mt-2">
                      <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
                        <span>Limit: ₹{limit.toFixed(2)}</span>
                        <span>{percentUsed}% used</span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all ${Number(percentUsed) >= 100
                            ? "bg-red-500"
                            : Number(percentUsed) >= 80
                              ? "bg-amber-500"
                              : "bg-brand"
                            }`}
                          style={{ width: `${percentUsed}%` }}
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveLimit(cat)}
                        className="text-xs text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 mt-1"
                      >
                        Remove limit
                      </button>
                    </div>
                  ) : (
                    <div className="mt-2">
                      {editingLimit === cat ? (
                        <div className="flex gap-2">
                          <input
                            type="number"
                            min="1"
                            step="100"
                            value={limitValue}
                            onChange={(e) => setLimitValue(e.target.value)}
                            placeholder="Set limit"
                            className="flex-1 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-2 py-1 text-xs focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
                          />
                          <button
                            type="button"
                            onClick={() => handleSetLimit(cat)}
                            className="rounded bg-brand px-2 py-1 text-xs text-white hover:bg-brand-dark"
                          >
                            Set
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setEditingLimit(null);
                              setLimitValue("");
                            }}
                            className="rounded border border-gray-300 dark:border-gray-600 px-2 py-1 text-xs text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => setEditingLimit(cat)}
                          className="text-xs text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                        >
                          + Set spending limit
                        </button>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 flex justify-between font-semibold text-gray-900 dark:text-white">
            <span>Total</span>
            <span>₹{total.toFixed(2)}</span>
          </div>
        </div>

        {/* Pie Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm hover:shadow-md transition-shadow">
          <Graph expenses={expensesForSelectedMonth} />
        </div>
      </div>
    </div>
  );
}
