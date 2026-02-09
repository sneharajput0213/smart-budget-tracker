import { useBudget } from "../context/BudgetContext";
import Graph from "../components/Graph";

export default function Reports() {
  const {
    expensesForSelectedMonth,
    budgetForSelectedMonth,
    selectedMonth,
    expensesByMonth,
  } = useBudget();

  const spent = expensesForSelectedMonth.reduce(
    (sum, e) => sum + Number(e.amount),
    0
  );
  const remaining = budgetForSelectedMonth - spent;
  const percentUsed =
    budgetForSelectedMonth > 0
      ? Math.min((spent / budgetForSelectedMonth) * 100, 100).toFixed(1)
      : 0;

  const byCategory = expensesForSelectedMonth.reduce((acc, e) => {
    acc[e.category] = (acc[e.category] || 0) + Number(e.amount);
    return acc;
  }, {});

  const categoryEntries = Object.entries(byCategory).sort((a, b) => b[1] - a[1]);
  const topCategory = categoryEntries[0];
  const lowestCategory = categoryEntries.length > 1 ? categoryEntries[categoryEntries.length - 1] : null;

  const monthKeys = Object.keys(expensesByMonth);
  const totalAllMonths = monthKeys.reduce((sum, m) => {
    const list = expensesByMonth[m] ?? [];
    return sum + list.reduce((s, e) => s + Number(e.amount), 0);
  }, 0);

  const avgPerMonth = monthKeys.length > 0 ? totalAllMonths / monthKeys.length : 0;
  const transactionCount = expensesForSelectedMonth.length;
  const avgPerTransaction = transactionCount > 0 ? spent / transactionCount : 0;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Reports</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
          Detailed summary and insights for {selectedMonth}
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5 shadow-sm hover:shadow-md transition-shadow">
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Budget Used</p>
          <p className="text-2xl font-semibold text-gray-900 dark:text-white mt-1">
            {percentUsed}%
          </p>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">{selectedMonth}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5 shadow-sm hover:shadow-md transition-shadow">
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Remaining</p>
          <p
            className={`text-2xl font-semibold mt-1 ${remaining >= 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
              }`}
          >
            ₹{remaining.toFixed(2)}
          </p>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">{selectedMonth}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5 shadow-sm hover:shadow-md transition-shadow">
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Transactions</p>
          <p className="text-2xl font-semibold text-gray-900 dark:text-white mt-1">
            {transactionCount}
          </p>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">This month</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5 shadow-sm hover:shadow-md transition-shadow">
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Avg per Transaction</p>
          <p className="text-2xl font-semibold text-gray-900 dark:text-white mt-1">
            ₹{avgPerTransaction.toFixed(2)}
          </p>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">{selectedMonth}</p>
        </div>
      </div>

      {/* Category Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
          <h2 className="text-lg font-medium text-gray-800 dark:text-white mb-4">
            Category Breakdown
          </h2>
          {categoryEntries.length > 0 ? (
            <div className="space-y-3">
              {categoryEntries.map(([cat, amount]) => {
                const percentage = (amount / spent) * 100;
                return (
                  <div key={cat} className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          {cat}
                        </span>
                        <span className="text-sm font-semibold text-gray-900 dark:text-white">
                          ₹{amount.toFixed(2)}
                        </span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-brand transition-all"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                        {percentage.toFixed(1)}% of total spending
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-sm text-gray-500">No expenses this month</p>
          )}
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
          <h2 className="text-lg font-medium text-gray-800 dark:text-white mb-4">
            Category Insights
          </h2>
          <div className="space-y-4">
            {topCategory && (
              <div className="p-4 bg-green-50 dark:bg-green-900/30 rounded-lg border border-green-200 dark:border-green-800">
                <p className="text-xs font-medium text-green-800 dark:text-green-300 mb-1">
                  Highest Spending
                </p>
                <p className="text-lg font-semibold text-green-900 dark:text-green-100">
                  {topCategory[0]}
                </p>
                <p className="text-sm text-green-700 dark:text-green-200">
                  ₹{topCategory[1].toFixed(2)}
                </p>
              </div>
            )}
            {lowestCategory && (
              <div className="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg border border-blue-200 dark:border-blue-800">
                <p className="text-xs font-medium text-blue-800 dark:text-blue-300 mb-1">
                  Lowest Spending
                </p>
                <p className="text-lg font-semibold text-blue-900 dark:text-blue-100">
                  {lowestCategory[0]}
                </p>
                <p className="text-sm text-blue-700 dark:text-blue-200">
                  ₹{lowestCategory[1].toFixed(2)}
                </p>
              </div>
            )}
            {categoryEntries.length === 0 && (
              <p className="text-sm text-gray-500">No category data available</p>
            )}
          </div>
        </div>
      </div>

      {/* Visual Chart */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
        <h2 className="text-lg font-medium text-gray-800 dark:text-white mb-4">
          Spending Distribution
        </h2>
        <Graph expenses={expensesForSelectedMonth} />
      </div>

      {/* All-time Summary */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
        <h2 className="text-lg font-medium text-gray-800 dark:text-white mb-4">
          All-time Summary
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Total Expenses</p>
            <p className="text-3xl font-semibold text-gray-900 dark:text-white mt-1">
              ₹{totalAllMonths.toFixed(2)}
            </p>
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
              Across {monthKeys.length} month{monthKeys.length !== 1 ? "s" : ""}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Average per Month</p>
            <p className="text-3xl font-semibold text-gray-900 dark:text-white mt-1">
              ₹{avgPerMonth.toFixed(2)}
            </p>
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
              Based on all recorded months
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
