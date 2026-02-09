import { useState, useEffect } from "react";
import { useBudget } from "../context/BudgetContext";
import { useTheme } from "../context/ThemeContext";

export default function Settings() {
  const {
    selectedMonth,
    selectedYear,
    setSelectedYear,
    budgetForSelectedMonth,
    setBudget,
    months,
    clearMonthExpenses,
    resetAll,
    expensesForSelectedMonth,
  } = useBudget();
  const { theme, setTheme } = useTheme();
  const [localBudget, setLocalBudget] = useState(String(budgetForSelectedMonth));
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  // Sync when budget loads from localStorage or when month changes
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- sync from context after localStorage hydration
    setLocalBudget(String(budgetForSelectedMonth));
  }, [budgetForSelectedMonth, selectedMonth]);

  const handleSave = () => {
    const value = Number(localBudget);
    setError("");
    if (Number.isNaN(value) || value <= 0) {
      setError("Please enter a valid amount greater than 0.");
      return;
    }
    setBudget(selectedMonth, value);
    setLocalBudget(String(value));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleClearMonth = () => {
    clearMonthExpenses(selectedMonth);
    setShowClearConfirm(false);
  };

  const handleResetAll = () => {
    resetAll();
    setShowResetConfirm(false);
    setLocalBudget(String(budgetForSelectedMonth));
  };

  const expenseCount = expensesForSelectedMonth.length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Settings</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
          Manage your monthly budget and preferences
        </p>
      </div>

      {/* Theme Settings */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm max-w-md">
        <h2 className="text-lg font-medium text-gray-800 dark:text-white mb-2">
          Appearance
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          Choose your preferred theme.
        </p>
        <div className="flex bg-gray-100 dark:bg-gray-700 p-1 rounded-lg">
          {["light", "dark", "system"].map((t) => (
            <button
              key={t}
              onClick={() => setTheme(t)}
              className={`flex-1 py-1.5 text-sm font-medium rounded-md capitalize transition-all ${theme === t
                ? "bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm"
                : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Year (used for expense dates) */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm max-w-md">
        <h2 className="text-lg font-medium text-gray-800 dark:text-white mb-2">
          Year
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          The year used for all expense dates. Month is selected from the navbar; only the day is chosen when adding an expense.
        </p>
        <label htmlFor="year-select" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Year
        </label>
        <select
          id="year-select"
          value={selectedYear}
          onChange={(e) => setSelectedYear(Number(e.target.value))}
          className="block w-full max-w-[140px] rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white px-3 py-2 text-gray-900 shadow-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
        >
          {Array.from({ length: 31 }, (_, i) => new Date().getFullYear() - 15 + i).map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>
      </div>

      {/* Monthly Budget */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm max-w-md">
        <h2 className="text-lg font-medium text-gray-800 dark:text-white mb-2">
          Monthly Budget
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          Set your budget limit for <strong>{selectedMonth}</strong>. You can set
          a different budget for each month from the month selector in the
          navbar.
        </p>
        <div className="space-y-2">
          <label
            htmlFor="budget-amount"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Budget amount (₹)
          </label>
          <input
            id="budget-amount"
            type="number"
            min="1"
            step="100"
            value={localBudget}
            onChange={(e) => {
              setLocalBudget(e.target.value);
              setError("");
            }}
            className="block w-full max-w-[200px] rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white px-3 py-2 text-gray-900 shadow-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
          />
          {error && (
            <p className="text-sm text-red-600 dark:text-red-400" role="alert">
              {error}
            </p>
          )}
        </div>
        <button
          type="button"
          onClick={handleSave}
          className="mt-4 inline-flex items-center justify-center rounded-lg bg-brand px-4 py-2 text-sm font-medium text-white hover:bg-brand-dark transition-colors"
        >
          {saved ? "✓ Saved" : "Save budget"}
        </button>
      </div>

      {/* Clear Current Month Expenses */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm max-w-md">
        <h2 className="text-lg font-medium text-gray-800 dark:text-white mb-2">
          Clear Current Month Expenses
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          Remove all expenses for <strong>{selectedMonth}</strong>. This action
          cannot be undone. Currently, you have {expenseCount} expense
          {expenseCount !== 1 ? "s" : ""} for this month.
        </p>
        {!showClearConfirm ? (
          <button
            type="button"
            onClick={() => setShowClearConfirm(true)}
            disabled={expenseCount === 0}
            className="inline-flex items-center justify-center rounded-lg border border-red-300 dark:border-red-800 bg-white dark:bg-transparent px-4 py-2 text-sm font-medium text-red-700 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Clear {selectedMonth} Expenses
          </button>
        ) : (
          <div className="space-y-2">
            <p className="text-sm text-red-600 dark:text-red-400 font-medium">
              Are you sure? This will delete all {expenseCount} expense
              {expenseCount !== 1 ? "s" : ""} for {selectedMonth}.
            </p>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleClearMonth}
                className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 transition-colors"
              >
                Yes, Clear All
              </button>
              <button
                type="button"
                onClick={() => setShowClearConfirm(false)}
                className="rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-4 py-2 text-sm font-medium text-gray-700 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Reset All Data */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-red-200 dark:border-red-800 p-6 shadow-sm max-w-md">
        <h2 className="text-lg font-medium text-red-800 dark:text-red-400 mb-2">
          Reset All Data
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          This will permanently delete all your data including budgets, expenses,
          categories, and category limits across all months. This action cannot be
          undone.
        </p>
        {!showResetConfirm ? (
          <button
            type="button"
            onClick={() => setShowResetConfirm(true)}
            className="inline-flex items-center justify-center rounded-lg border border-red-300 dark:border-red-800 bg-white dark:bg-transparent px-4 py-2 text-sm font-medium text-red-700 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
          >
            Reset All Data
          </button>
        ) : (
          <div className="space-y-2">
            <p className="text-sm text-red-600 dark:text-red-400 font-medium">
              ⚠️ Warning: This will delete everything. Are you absolutely sure?
            </p>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleResetAll}
                className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 transition-colors"
              >
                Yes, Reset Everything
              </button>
              <button
                type="button"
                onClick={() => setShowResetConfirm(false)}
                className="rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-4 py-2 text-sm font-medium text-gray-700 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="text-sm text-gray-500">
        <p>Available months: {months.join(", ")}</p>
      </div>
    </div>
  );
}
