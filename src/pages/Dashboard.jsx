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

  // Recent 5 expenses (most recent first)
  const recentExpenses = expensesForSelectedMonth
    .slice()
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  const handleDelete = (id) => {
    deleteExpense(selectedMonth, id);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            Track your expenses and manage your budget for {selectedMonth}
          </p>
        </div>
      </div>

      {/* Smart Alerts */}
      {isOverBudget && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3">
          <svg
            className="w-5 h-5 text-red-600 shrink-0 mt-0.5"
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
            <p className="text-sm font-semibold text-red-800">Over Budget</p>
            <p className="text-sm text-red-700 mt-0.5">
              You have exceeded your budget by ₹{Math.abs(remaining).toFixed(2)}. Consider reviewing your expenses.
            </p>
          </div>
        </div>
      )}

      {isNearLimit && !isOverBudget && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
          <svg
            className="w-5 h-5 text-amber-600 shrink-0 mt-0.5"
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
            <p className="text-sm font-semibold text-amber-800">Near Budget Limit</p>
            <p className="text-sm text-amber-700 mt-0.5">
              You've used {percentUsed.toFixed(1)}% of your budget. Only ₹{remaining.toFixed(2)} remaining.
            </p>
          </div>
        </div>
      )}

      {isUnderBudget && !isNearLimit && !isOverBudget && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-start gap-3">
          <svg
            className="w-5 h-5 text-green-600 shrink-0 mt-0.5"
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
            <p className="text-sm font-semibold text-green-800">Under Budget</p>
            <p className="text-sm text-green-700 mt-0.5">
              Great! You've used only {percentUsed.toFixed(1)}% of your budget. ₹{remaining.toFixed(2)} remaining.
            </p>
          </div>
        </div>
      )}

      <Budget total={budgetForSelectedMonth} spent={spent} />
      <Cards expenses={expensesForSelectedMonth} />

      {/* Recent 5 Expenses */}
      {recentExpenses.length > 0 && (
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Recent Expenses
          </h2>
          <div className="space-y-3">
            {recentExpenses.map((expense) => {
              const categoryColors = {
                Food: "bg-emerald-100 text-emerald-700",
                Travel: "bg-blue-100 text-blue-700",
                Shopping: "bg-purple-100 text-purple-700",
                Bills: "bg-amber-100 text-amber-700",
                Others: "bg-gray-100 text-gray-700",
              };
              return (
                <div
                  key={expense.id ?? `${expense.date}-${expense.amount}`}
                  className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        categoryColors[expense.category] ?? categoryColors.Others
                      }`}
                    >
                      {expense.category}
                    </span>
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {expense.note || "No note"}
                      </p>
                      <p className="text-xs text-gray-500">{expense.date}</p>
                    </div>
                  </div>
                  <p className="text-sm font-semibold text-gray-900">
                    ₹{Number(expense.amount).toFixed(2)}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <Graph expenses={expensesForSelectedMonth} />
      <Details
        expenses={expensesForSelectedMonth}
        onDelete={handleDelete}
        categories={categories}
      />
    </div>
  );
}
