import { useBudget } from "../context/BudgetContext";
import Budget from "../components/Budget";
import Cards from "../components/Cards";
import Graph from "../components/Graph";
import Details from "../components/Details";

export default function Dashboard() {
  const {
    expensesForSelectedMonth,
    budgetForSelectedMonth,
    selectedMonth,
    deleteExpense,
    categories,
  } = useBudget();

  const spent = expensesForSelectedMonth.reduce(
    (sum, e) => sum + Number(e.amount),
    0
  );

  const remaining = budgetForSelectedMonth - spent;
  const percentUsed =
    budgetForSelectedMonth > 0
      ? Math.min((spent / budgetForSelectedMonth) * 100, 100)
      : 0;

  // Smart alerts
  const isOverBudget = remaining < 0;
  const isNearLimit = percentUsed >= 80 && percentUsed < 100;
  const isUnderBudget = percentUsed < 50;

  const handleDelete = (id) => {
    deleteExpense(selectedMonth, id);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Dashboard</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
            Track your expenses and manage your budget for {selectedMonth}
          </p>
        </div>
      </div>

      {/* Smart Alerts */}
      {isOverBudget && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4 flex items-start gap-3">
          <svg
            className="w-5 h-5 text-red-600 dark:text-red-400 shrink-0 mt-0.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <div className="flex-1">
            <p className="text-sm font-semibold text-red-800 dark:text-red-300">Over Budget</p>
            <p className="text-sm text-red-700 dark:text-red-200 mt-0.5">
              You have exceeded your budget by ₹{Math.abs(remaining).toFixed(2)}. Consider reviewing your expenses.
            </p>
          </div>
        </div>
      )}

      {isNearLimit && !isOverBudget && (
        <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-4 flex items-start gap-3">
          <svg
            className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <div className="flex-1">
            <p className="text-sm font-semibold text-amber-800 dark:text-amber-300">Near Budget Limit</p>
            <p className="text-sm text-amber-700 dark:text-amber-200 mt-0.5">
              You've used {percentUsed.toFixed(1)}% of your budget. Only ₹{remaining.toFixed(2)} remaining.
            </p>
          </div>
        </div>
      )}

      {isUnderBudget && !isNearLimit && !isOverBudget && (
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-4 flex items-start gap-3">
          <svg
            className="w-5 h-5 text-green-600 dark:text-green-400 shrink-0 mt-0.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <div className="flex-1">
            <p className="text-sm font-semibold text-green-800 dark:text-green-300">Under Budget</p>
            <p className="text-sm text-green-700 dark:text-green-200 mt-0.5">
              Great! You've used only {percentUsed.toFixed(1)}% of your budget. ₹{remaining.toFixed(2)} remaining.
            </p>
          </div>
        </div>
      )}

      <Budget total={budgetForSelectedMonth} spent={spent} />
      <Cards expenses={expensesForSelectedMonth} />



      <Graph expenses={expensesForSelectedMonth} />
      <Details
        expenses={expensesForSelectedMonth}
        onDelete={handleDelete}
        categories={categories}
      />
    </div>
  );
}
