import { useBudget } from "../context/BudgetContext";

export default function Navbar() {
  const { months, selectedMonth, setSelectedMonth } = useBudget();

  return (
    <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-6 shadow-sm">
      <h1 className="text-xl font-semibold text-brand">Smart Budget</h1>
      <div className="flex items-center gap-4">
        <label htmlFor="month-select" className="sr-only">
          Select month
        </label>
        <select
          id="month-select"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          className="rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-4 py-2 text-sm font-medium text-gray-700 dark:text-white shadow-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
        >
          {months.map((month) => (
            <option key={month} value={month}>
              {month}
            </option>
          ))}
        </select>
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-light dark:bg-brand-dark/20">
          <svg
            className="h-5 w-5 text-brand"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
        </div>
      </div>
    </header>
  );
}
