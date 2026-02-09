function Budget({ total, spent }) {
  const remaining = total - spent;
  const percent =
    total > 0 ? Math.min((spent / total) * 100, 100).toFixed(1) : 0;
  const percentNum = Number(percent);

  // Progress bar color based on usage
  let progressColor = "bg-brand";
  if (percentNum >= 100) {
    progressColor = "bg-red-500";
  } else if (percentNum >= 80) {
    progressColor = "bg-amber-500";
  } else {
    progressColor = "bg-brand";
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm hover:shadow-md transition-shadow">
      <h2 className="text-base font-semibold text-gray-800 dark:text-white mb-4">
        Monthly Budget
      </h2>
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Total Budget</p>
          <p className="text-xl font-semibold text-gray-900 dark:text-white mt-0.5">
            ₹{Number(total).toLocaleString()}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Spent</p>
          <p className="text-xl font-semibold text-red-600 dark:text-red-400 mt-0.5">
            ₹{Number(spent).toFixed(2)}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Remaining</p>
          <p
            className={`text-xl font-semibold mt-0.5 ${remaining >= 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
              }`}
          >
            ₹{Number(remaining).toFixed(2)}
          </p>
        </div>
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{percent}% used</p>
      <div className="h-3 w-full rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
        <div
          className={`h-full rounded-full ${progressColor} transition-all duration-300`}
          style={{ width: `${Math.min(percentNum, 100)}%` }}
        />
      </div>
    </div>
  );
}

export default Budget;
